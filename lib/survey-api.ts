"use client"

// Fallback to localStorage when Supabase is not available
export async function submitSurveyData(data: {
  participant: any
  answers: Record<string, string | string[]>
  completedAt: string
}) {
  try {
    // Store in localStorage for demo purposes
    const existingData = JSON.parse(localStorage.getItem("survey_submissions") || "[]")
    const newSubmission = {
      id: Date.now(),
      ...data.participant,
      answers: data.answers,
      completed_at: data.completedAt,
      created_at: new Date().toISOString(),
    }
    existingData.push(newSubmission)
    localStorage.setItem("survey_submissions", JSON.stringify(existingData))

    return { success: true }
  } catch (error) {
    console.error("Survey submission error:", error)
    throw error
  }
}

export async function getSurveyData() {
  try {
    const data = JSON.parse(localStorage.getItem("survey_submissions") || "[]")
    return data.map((item: any) => ({
      id: item.id,
      name: item.name,
      department: item.department,
      nickname: item.nickname,
      skill_level: item.skillLevel,
      completed_at: item.completed_at,
      survey_answers: Object.entries(item.answers).map(([question_id, answer]) => ({
        question_id,
        answer_text: typeof answer === "string" ? answer : null,
        answer_options: Array.isArray(answer) ? answer : null,
      })),
    }))
  } catch (error) {
    console.error("Error fetching survey data:", error)
    return []
  }
}
