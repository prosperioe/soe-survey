"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Users, Calendar, BarChart3, Eye, ChevronDown, ChevronUp } from "lucide-react"
import { getSurveyData } from "@/lib/survey-api"

export const dynamic = "force-dynamic"

type ParticipantData = {
  id: number
  name: string
  department: string
  nickname: string
  skill_level: string
  completed_at: string
  survey_answers: Array<{
    question_id: string
    answer_text: string | null
    answer_options: string[] | null
  }>
}

export default function AdminPage() {
  const [data, setData] = useState<ParticipantData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const surveyData = await getSurveyData()
      setData(surveyData)
    } catch (err) {
      setError("Failed to load survey data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function toggleExpanded(id: number) {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  function downloadCSV() {
    if (data.length === 0) return

    const csvRows: string[] = []
    const headers = [
      "Name",
      "Department",
      "Nickname",
      "Skill Level",
      "Completed At",
      "Question ID",
      "Text Answer",
      "Multiple Choice Answers",
    ]
    csvRows.push(headers.join(","))

    data.forEach((participant) => {
      participant.survey_answers.forEach((answer) => {
        const row = [
          `"${participant.name}"`,
          `"${participant.department}"`,
          `"${participant.nickname}"`,
          `"${participant.skill_level}"`,
          `"${participant.completed_at}"`,
          `"${answer.question_id}"`,
          `"${answer.answer_text || ""}"`,
          `"${answer.answer_options ? answer.answer_options.join("; ") : ""}"`,
        ]
        csvRows.push(row.join(","))
      })
    })

    const csvContent = csvRows.join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `survey-data-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  function downloadJSON() {
    if (data.length === 0) return

    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `survey-data-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading survey data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadData}>Try Again</Button>
        </div>
      </div>
    )
  }

  const beginnerCount = data.filter((p) => ["Beginner", "Intermediate"].includes(p.skill_level)).length
  const expertCount = data.filter((p) => ["Expert", "Pro"].includes(p.skill_level)).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Survey Admin Dashboard</h1>
          <p className="text-gray-600">View and analyze survey responses</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beginner/Intermediate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{beginnerCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expert/Pro</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expertCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Latest Response</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">
                {data.length > 0 ? new Date(data[0].completed_at).toLocaleDateString() : "No data"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Download Buttons */}
        <div className="mb-6 flex gap-3">
          <Button onClick={downloadCSV} disabled={data.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Download CSV
          </Button>
          <Button onClick={downloadJSON} variant="outline" disabled={data.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Download JSON
          </Button>
          <Button onClick={loadData} variant="outline">
            Refresh Data
          </Button>
        </div>

        {/* Data Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Responses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Recent Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Department</th>
                        <th className="text-left p-2">Skill Level</th>
                        <th className="text-left p-2">Completed</th>
                        <th className="text-left p-2">Answers</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((participant) => (
                        <tr key={participant.id} className="border-b">
                          <td className="p-2 font-medium">{participant.name}</td>
                          <td className="p-2">{participant.department}</td>
                          <td className="p-2">
                            <Badge
                              variant={["Expert", "Pro"].includes(participant.skill_level) ? "default" : "secondary"}
                            >
                              {participant.skill_level}
                            </Badge>
                          </td>
                          <td className="p-2">{new Date(participant.completed_at).toLocaleDateString()}</td>
                          <td className="p-2">{participant.survey_answers.length} responses</td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm" onClick={() => toggleExpanded(participant.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed">
            <div className="space-y-4">
              {data.map((participant) => (
                <Card key={participant.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {participant.name} ({participant.nickname})
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {participant.department} • {participant.skill_level} •
                          {new Date(participant.completed_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="ghost" onClick={() => toggleExpanded(participant.id)}>
                        {expandedRows.has(participant.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  {expandedRows.has(participant.id) && (
                    <CardContent>
                      <div className="space-y-4">
                        {participant.survey_answers.map((answer, index) => (
                          <div key={index} className="border-l-4 border-blue-200 pl-4">
                            <p className="font-medium text-sm text-gray-600 mb-1">{answer.question_id}</p>
                            {answer.answer_text && <p className="text-gray-900">{answer.answer_text}</p>}
                            {answer.answer_options && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {answer.answer_options.map((option, optIndex) => (
                                  <Badge key={optIndex} variant="outline">
                                    {option}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
