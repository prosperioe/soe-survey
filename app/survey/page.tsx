"use client"
export const dynamic = 'force-dynamic'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { getParticipant, saveAnswer, getAnswers } from "@/lib/client-store"
import { getBeginnerQuestions, getAdvancedQuestions, type Question } from "@/lib/survey-data"

export default function SurveyPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [participant, setParticipantData] = useState<any>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const init = async () => {
      const participantData = await getParticipant()
      setParticipantData(participantData)
      const questionsData = await getBeginnerQuestions()
      setQuestions(questionsData)
      setReady(true)
    }
    init()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const completedAt = new Date().toISOString();

    try {
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participant, answers, completedAt }),
      });
      const result = await response.json();
      if (result.success) {
        router.push('/thank-you');
      } else {
        console.error('Submission failed:', result.error);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Example navigation logic (adjust based on your actual implementation)
  const handleNext = () => {
    if (index < questions.length - 1) setIndex(index + 1);
  };

  const handlePrevious = () => {
    if (index > 0) setIndex(index - 1);
  };

  // Helper variables and handlers
  const total = questions.length;
  const current = questions[index];
  const isLastQuestion = index === total - 1;

  // Helper for setting answers
  function setAnswer(value: string | string[]) {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: value,
    }));
  }

  // Helper for multiple choice toggle
  function toggleMultipleChoice(opt: string) {
    setAnswers((prev) => {
      const prevArr = (prev[current.id] as string[]) || [];
      if (prevArr.includes(opt)) {
        return { ...prev, [current.id]: prevArr.filter((o) => o !== opt) };
      } else {
        return { ...prev, [current.id]: [...prevArr, opt] };
      }
    });
  }

  // Navigation handlers
  function onPrev() {
    if (index > 0) setIndex(index - 1);
  }
  function onNext() {
    if (isLastQuestion) {
      handleSubmit(new Event("submit") as any);
    } else if (index < total - 1) {
      setIndex(index + 1);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="mx-auto max-w-5xl">
        <div className="bg-white/80 backdrop-blur-xl shadow-xl border border-gray-100 rounded-3xl m-4">
          {/* Header Bar */}
          <div className="px-4 md:px-8 pt-6 md:pt-8">
            <div className="flex items-center">
              <button
                onClick={onPrev}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                disabled={index === 0}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>
              <div className="mx-4 md:mx-6 flex-1">
                <Stepper total={total} currentIndex={index} />
              </div>
              <div className="text-right">
                <span className="inline-flex items-center font-black tracking-wide text-blue-700">
                  <span className="mr-1 text-xs uppercase text-blue-400">SOE</span>
                  Survey
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 md:px-24 py-10">
            <div className="text-center mb-8">
              <div className="text-[11px] font-bold tracking-[0.12em] text-amber-500 uppercase">
                {`Question ${Math.min(index + 1, total)} / ${total}`}
              </div>
              <h1 className="mt-2 text-2xl md:text-[28px] font-extrabold leading-tight">{current?.prompt ?? ""}</h1>
            </div>

            <div className="max-w-2xl mx-auto">
              {current?.type === "text" ? (
                <Textarea
                  value={(answers[current.id] as string) ?? ""}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-[140px] rounded-2xl bg-gray-50 border-gray-200"
                />
              ) : current?.type === "single" ? (
                <RadioGroup
                  value={(answers[current.id] as string) ?? ""}
                  onValueChange={(v) => setAnswer(v)}
                  className="grid gap-3"
                >
                  {current?.options?.map((opt) => (
                    <OptionPill
                      key={opt}
                      value={opt}
                      selected={(answers[current.id] as string) === opt}
                      type="single"
                    />
                  ))}
                </RadioGroup>
              ) : current?.type === "multiple" ? (
                <div className="grid gap-3">
                  {current?.options?.map((opt) => (
                    <MultipleOptionPill
                      key={opt}
                      value={opt}
                      selected={((answers[current.id] as string[]) || []).includes(opt)}
                      onToggle={() => toggleMultipleChoice(opt)}
                    />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-10 flex justify-center">
              <Button
                onClick={onNext}
                disabled={
                  !current ||
                  isSubmitting ||
                  !answers[current.id] ||
                  (Array.isArray(answers[current.id]) && (answers[current.id] as string[]).length === 0) ||
                  (typeof answers[current.id] === "string" && !(answers[current.id] as string).trim())
                }
                className="rounded-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : isLastQuestion ? (
                  "Submit Survey"
                ) : (
                  <>
                    Next Question <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Stepper({ total, currentIndex }: { total: number; currentIndex: number }) {
  const steps = Array.from({ length: total })
  return (
    <div className="flex items-center gap-2">
      {steps.map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-2 flex-1 rounded-full transition-colors duration-300",
            i <= currentIndex ? "bg-amber-400" : "bg-gray-200",
          )}
        />
      ))}
    </div>
  )
}

function OptionPill({ value, selected, type }: { value: string; selected: boolean; type: "single" }) {
  return (
    <label
      className={cn(
        "group relative flex items-center gap-3 rounded-full border px-4 py-3 bg-gray-100 cursor-pointer transition-all",
        selected ? "ring-2 ring-amber-400 bg-amber-50 border-amber-300" : "hover:bg-gray-200 border-gray-200",
      )}
    >
      <RadioGroupItem className="sr-only" value={value} id={value} />
      <span
        aria-hidden
        className={cn(
          "inline-flex h-5 w-5 items-center justify-center rounded-full border-2",
          selected ? "border-amber-500 bg-amber-500" : "border-gray-400 bg-white",
        )}
      >
        <span className={cn("h-2.5 w-2.5 rounded-full", selected ? "bg-white" : "bg-transparent")} />
      </span>
      <Label htmlFor={value} className="cursor-pointer font-medium text-sm md:text-[15px] text-gray-700">
        {value}
      </Label>
    </label>
  )
}

function MultipleOptionPill({ value, selected, onToggle }: { value: string; selected: boolean; onToggle: () => void }) {
  return (
    <label
      className={cn(
        "group relative flex items-center gap-3 rounded-full border px-4 py-3 bg-gray-100 cursor-pointer transition-all",
        selected ? "ring-2 ring-amber-400 bg-amber-50 border-amber-300" : "hover:bg-gray-200 border-gray-200",
      )}
      onClick={onToggle}
    >
      <Checkbox
        checked={selected}
        onCheckedChange={onToggle}
        className={cn("rounded border-2", selected ? "border-amber-500 bg-amber-500" : "border-gray-400 bg-white")}
      />
      <span className="font-medium text-sm md:text-[15px] text-gray-700">{value}</span>
    </label>
  )
}