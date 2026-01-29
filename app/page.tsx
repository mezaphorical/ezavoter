'use client'

import { useState, useEffect } from 'react'

interface Excuse {
  id: number
  text: string
  votes: number
  created_at: string
}

export default function Home() {
  const [excuses, setExcuses] = useState<Excuse[]>([])
  const [newExcuse, setNewExcuse] = useState('')
  const [sortBy, setSortBy] = useState<'votes' | 'recent'>('votes')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchExcuses()
  }, [sortBy])

  const fetchExcuses = async () => {
    try {
      const res = await fetch(`/api/excuses?sort=${sortBy}`)
      if (!res.ok) {
        throw new Error('Failed to fetch excuses')
      }
      const data = await res.json()
      if (Array.isArray(data)) {
        setExcuses(data)
      } else {
        console.error('Invalid response format:', data)
        setExcuses([])
      }
    } catch (error) {
      console.error('Failed to fetch excuses:', error)
      setExcuses([])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newExcuse.trim()) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/excuses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newExcuse }),
      })

      if (res.ok) {
        setNewExcuse('')
        fetchExcuses()
      }
    } catch (error) {
      console.error('Failed to submit excuse:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVote = async (id: number, delta: number) => {
    try {
      const res = await fetch(`/api/excuses/${id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta }),
      })

      if (res.ok) {
        fetchExcuses()
      }
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-10">
          🎓 Late Assignment Excuse Voter
        </h1>

        {/* Submit Section */}
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Your Excuse</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={newExcuse}
              onChange={(e) => setNewExcuse(e.target.value)}
              placeholder="Enter your creative excuse for being late..."
              className="w-full min-h-[100px] p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none resize-y"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Submitting...' : 'Submit Excuse'}
            </button>
          </form>
        </div>

        {/* Excuses Section */}
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Vote on Excuses</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('votes')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  sortBy === 'votes'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Top Voted
              </button>
              <button
                onClick={() => setSortBy('recent')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  sortBy === 'recent'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Most Recent
              </button>
            </div>
          </div>

          {excuses.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No excuses yet. Be the first to submit one!
            </div>
          ) : (
            <div className="space-y-4">
              {excuses.map((excuse) => (
                <div
                  key={excuse.id}
                  className="bg-gray-50 rounded-lg p-4 md:p-6 flex gap-4 hover:shadow-md transition"
                >
                  <div className="flex flex-col items-center gap-2 min-w-[60px]">
                    <button
                      onClick={() => handleVote(excuse.id, 1)}
                      className="p-2 hover:bg-green-100 rounded transition text-xl"
                    >
                      ▲
                    </button>
                    <div className="text-xl font-bold text-purple-600">
                      {excuse.votes}
                    </div>
                    <button
                      onClick={() => handleVote(excuse.id, -1)}
                      className="p-2 hover:bg-red-100 rounded transition text-xl"
                    >
                      ▼
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-lg leading-relaxed mb-2">
                      {excuse.text}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Submitted {formatDate(excuse.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
