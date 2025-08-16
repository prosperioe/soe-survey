"use client"
export const dynamic = 'force-dynamic'

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { setParticipant, getParticipant } from "@/lib/client-store"

const skillLevels = ["Beginner", "Intermediate", "Expert", "Pro"] as const
type SkillLevel = (typeof skillLevels)[number]

export default function Page() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [dept, setDept] = useState("")
  const [nickname, setNickname] = useState("")
  const [skill, setSkill] = useState<SkillLevel>("Beginner")

  useEffect(() => {
    const p = getParticipant()
    if (p?.name) {
      setName(p.name ?? "")
      setDept(p.department ?? "")
      setNickname(p.nickname ?? "")
      setSkill((p.skillLevel as SkillLevel) ?? "Beginner")
    }
  }, [])

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !dept.trim() || !nickname.trim()) return
    setParticipant({
      name: name.trim(),
      department: dept.trim(),
      nickname: nickname.trim(),
      skillLevel: skill,
      startedAt: Date.now(),
    })
    router.push("/survey")
  }

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/image/🖤.jpeg.jpg')"}}>
  <div className="absolute inset-0 bg-black/30" />
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
      <div className="relative flex min-h-screen items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-2xl rounded-3xl border-0 bg-orange-100/90 backdrop-blur-xl shadow-2xl shadow-orange-500/20">
          <CardHeader className="space-y-4 pb-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-red-600">
              <span className="text-2xl font-black text-white">SOE</span>
            </div>
            <div className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Welcome to SOE Survey
              </CardTitle>
              <p className="mt-2 text-lg text-muted-foreground">
                Join our survey and share your insights with the community
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 pt-6">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nickname" className="text-sm font-semibold text-gray-700">
                    Nickname
                  </Label>
                  <Input
                    id="nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="What should we call you?"
                    className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dept" className="text-sm font-semibold text-gray-700">
                  Department
                </Label>
                <Input
                  id="dept"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  placeholder="e.g. Engineering, Marketing, Design"
                  className="h-12 rounded-xl border-gray-200 bg-gray-50/50 px-4 focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-semibold text-gray-700">Skill Level</Label>
                <RadioGroup
                  className="grid grid-cols-2 gap-4"
                  value={skill}
                  onValueChange={(val) => setSkill(val as SkillLevel)}
                >
                  {skillLevels.map((lvl) => (
                    <label
                      key={lvl}
                      className={cn(
                        "relative flex cursor-pointer rounded-xl border-2 p-4 transition-all hover:bg-gray-50",
                        skill === lvl ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500" : "border-gray-200 bg-white",
                      )}
                    >
                      <RadioGroupItem className="sr-only" id={`skill-${lvl}`} value={lvl} />
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full border-2",
                            skill === lvl ? "border-blue-500 bg-blue-500" : "border-gray-300 bg-white",
                          )}
                        >
                          {skill === lvl && <span className="h-2 w-2 rounded-full bg-white" />}
                        </span>
                        <span className="font-medium text-gray-900">{lvl}</span>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
                <p className="text-xs text-muted-foreground bg-blue-50 rounded-lg p-3">
                  💡 <strong>Beginner/Intermediate:</strong> Foundational questions about your journey
                  <br />🚀 <strong>Expert/Pro:</strong> Advanced technical and strategic questions
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:from-green-700 hover:to-emerald-700"
                disabled={!name.trim() || !dept.trim() || !nickname.trim()}
              >
                Start Survey →
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Created by</span>
              <span className="font-semibold text-gray-900">@prosper chinyeaka</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Connect with me:</span>
              <div className="flex gap-3">
                <a
                  href="https://x.com/karos812052?t=sUdkU_jolFC8lEmm1E3IDQ&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com/in/prosperchinyeaka" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-600"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com/prosperchinyeaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-gray-800 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="chinyeakaprosper2006@gmail.com"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-green-100 hover:text-green-600"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
