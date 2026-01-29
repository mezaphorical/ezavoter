import { sql } from '@vercel/postgres'

export interface Excuse {
  id: number
  text: string
  votes: number
  created_at: string
}

export async function getExcuses(sortBy: 'votes' | 'recent' = 'votes'): Promise<Excuse[]> {
  let rows

  if (sortBy === 'votes') {
    const result = await sql`
      SELECT id, text, votes, created_at
      FROM excuses
      ORDER BY votes DESC, created_at DESC
    `
    rows = result.rows
  } else {
    const result = await sql`
      SELECT id, text, votes, created_at
      FROM excuses
      ORDER BY created_at DESC
    `
    rows = result.rows
  }

  return rows as Excuse[]
}

export async function createExcuse(text: string): Promise<Excuse> {
  const { rows } = await sql`
    INSERT INTO excuses (text, votes, created_at)
    VALUES (${text}, 0, NOW())
    RETURNING id, text, votes, created_at
  `

  return rows[0] as Excuse
}

export async function voteOnExcuse(id: number, delta: number): Promise<Excuse> {
  const { rows } = await sql`
    UPDATE excuses
    SET votes = votes + ${delta}
    WHERE id = ${id}
    RETURNING id, text, votes, created_at
  `

  return rows[0] as Excuse
}

export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS excuses (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        votes INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `
  } catch (error) {
    console.error('Failed to initialize database:', error)
    throw error
  }
}
