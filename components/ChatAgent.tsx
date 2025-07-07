'use client'

import { useState } from 'react'
import { useNotionSSE } from '@/hooks/use-notion-sse'

export function ChatAgent() {
  const { messages, error } = useNotionSSE()
  const [input, setInput] = useState('')
  const [local, setLocal] = useState<string[]>([])

  const handleSend = () => {
    if (!input) return
    setLocal((prev) => [...prev, `You: ${input}`])
    setInput('')
  }

  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto p-4">
      <div className="border rounded p-2 h-64 overflow-y-auto bg-background text-sm">
        {local.concat(messages).map((msg, idx) => (
          <div key={idx} className="mb-1 whitespace-pre-wrap">
            {msg}
          </div>
        ))}
        {error && <div className="text-red-500">{error.message}</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2 text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="button"
          className="border rounded px-3 py-2 bg-primary text-primary-foreground"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  )
}
