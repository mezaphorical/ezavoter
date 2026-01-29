import { NextRequest, NextResponse } from 'next/server'
import { getExcuses, createExcuse, initializeDatabase } from '@/lib/db'

let isInitialized = false

export async function GET(request: NextRequest) {
  try {
    // Initialize database on first request
    if (!isInitialized) {
      await initializeDatabase()
      isInitialized = true
    }

    const searchParams = request.nextUrl.searchParams
    const sort = searchParams.get('sort') as 'votes' | 'recent' || 'votes'

    const excuses = await getExcuses(sort)
    return NextResponse.json(excuses)
  } catch (error) {
    console.error('Error fetching excuses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch excuses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const excuse = await createExcuse(text.trim())
    return NextResponse.json(excuse, { status: 201 })
  } catch (error) {
    console.error('Error creating excuse:', error)
    return NextResponse.json(
      { error: 'Failed to create excuse' },
      { status: 500 }
    )
  }
}
