import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { participant, answers, completedAt } = data

    const newSubmission = {
      name: participant.name,
      department: participant.department,
      nickname: participant.nickname,
      skill_level: participant.skillLevel,
      answers,
      completed_at: completedAt,
      created_at: new Date().toISOString(),
    }

    const { data: insertedData, error } = await supabase
      .from('survey_answers')
      .insert([newSubmission])

    if (error) {
      console.error('Error submitting to Supabase:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: insertedData }, { status: 200 })
  } catch (error) {
    console.error('Survey submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}