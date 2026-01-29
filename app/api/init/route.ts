import { NextResponse } from 'next/server'
import { initializeDatabase } from '@/lib/db'

// Force dynamic rendering - don't try to build this at build time
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await initializeDatabase()
    return NextResponse.json({ message: 'Database initialized successfully' })
  } catch (error) {
    console.error('Error initializing database:', error)
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    )
  }
}
