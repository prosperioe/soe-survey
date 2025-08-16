"use client"
export const dynamic = 'force-dynamic'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { clearAll, getParticipant } from "@/lib/client-store"

export default function ThankYou() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(10)
  const name = getParticipant()?.name ?? "there"

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          clearAll()
          router.replace("/")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-100 p-12 text-center max-w-2xl mx-auto">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
          Thanks, {name}, for participating!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Your responses have been successfully recorded and will help us understand our community better.
        </p>

        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
          <p className="text-blue-700 font-medium">Redirecting you back to the start in {timeLeft} seconds...</p>
          <div className="mt-3 w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
            />
          </div>
        </div>

        <div className="text-sm text-gray-500">🎉 Your contribution makes a difference!</div>
      </div>
    </main>
  )
}
