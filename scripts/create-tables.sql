-- Create survey_participants table
CREATE TABLE IF NOT EXISTS survey_participants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  nickname VARCHAR(255) NOT NULL,
  skill_level VARCHAR(50) NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create survey_answers table
CREATE TABLE IF NOT EXISTS survey_answers (
  id SERIAL PRIMARY KEY,
  participant_id INTEGER REFERENCES survey_participants(id) ON DELETE CASCADE,
  question_id VARCHAR(50) NOT NULL,
  answer_text TEXT,
  answer_options JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_survey_participants_skill_level ON survey_participants(skill_level);
CREATE INDEX IF NOT EXISTS idx_survey_participants_created_at ON survey_participants(created_at);
CREATE INDEX IF NOT EXISTS idx_survey_answers_participant_id ON survey_answers(participant_id);
CREATE INDEX IF NOT EXISTS idx_survey_answers_question_id ON survey_answers(question_id);
