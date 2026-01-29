import { NextRequest, NextResponse } from 'next/server'
import { voteOnExcuse } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { delta } = await request.json()
    const id = parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid excuse ID' },
        { status: 400 }
      )
    }

    if (delta !== 1 && delta !== -1) {
      return NextResponse.json(
        { error: 'Delta must be 1 or -1' },
        { status: 400 }
      )
    }

    const excuse = await voteOnExcuse(id, delta)
    return NextResponse.json(excuse)
  } catch (error) {
    console.error('Error voting on excuse:', error)
    return NextResponse.json(
      { error: 'Failed to vote on excuse' },
      { status: 500 }
    )
  }
}
