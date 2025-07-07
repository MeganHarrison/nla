'use client'

import { useEffect, useState } from 'react'

interface UseNotionSSEOptions {
  token?: string
  /**
   * Allows injecting a custom EventSource implementation for testing.
   */
  eventSourceFactory?: typeof EventSource
}

export function useNotionSSE(options?: UseNotionSSEOptions) {
  const [messages, setMessages] = useState<string[]>([])
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const EventSourceImpl = options?.eventSourceFactory ?? EventSource
    const url = 'https://mcp.notion.com/sse'

    // # Reason: Notion MCP requires authentication. Headers cannot be set via
    // native EventSource, so a token query param is used if provided.
    const sseUrl = options?.token ? `${url}?token=${options.token}` : url

    let es: EventSource | null = null

    try {
      es = new EventSourceImpl(sseUrl)
    } catch (err) {
      setError(err as Error)
      return
    }

    es.onmessage = (ev) => {
      setMessages((prev) => [...prev, ev.data])
    }

    es.onerror = () => {
      setError(new Error('SSE connection error'))
    }

    return () => {
      es?.close()
    }
    // token is the only dependency. eventSourceFactory is stable in tests.
  }, [options?.token])

  return { messages, error }
}
