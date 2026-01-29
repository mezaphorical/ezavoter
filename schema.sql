-- Database schema for excuse voting app
-- This will be created automatically by the app, but included for reference

CREATE TABLE IF NOT EXISTS excuses (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Optional: Add an index for better query performance
CREATE INDEX IF NOT EXISTS idx_excuses_votes ON excuses(votes DESC);
CREATE INDEX IF NOT EXISTS idx_excuses_created_at ON excuses(created_at DESC);
