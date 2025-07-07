import { renderHook, act } from '@testing-library/react'
import { useNotionSSE } from '../../hooks/use-notion-sse'
import { describe, expect, it, vi } from 'vitest'

class MockEventSource {
  url: string
  onmessage: ((e: MessageEvent) => void) | null = null
  onerror: ((e: Event) => void) | null = null
  constructor(url: string) {
    this.url = url
  }
  close() {}
  emit(data: string) {
    this.onmessage?.({ data } as MessageEvent)
  }
  emitError() {
    this.onerror?.(new Event('error'))
  }
}

describe('useNotionSSE', () => {
  it('updates messages when an event is received', () => {
    const factory = vi.fn(() => new MockEventSource('test'))
    const { result } = renderHook(() => useNotionSSE({ eventSourceFactory: factory as any }))

    act(() => {
      const es = factory.mock.results[0].value as MockEventSource
      es.emit('hello')
    })

    expect(result.current.messages).toEqual(['hello'])
  })

  it('captures connection errors', () => {
    const factory = vi.fn(() => new MockEventSource('test'))
    const { result } = renderHook(() => useNotionSSE({ eventSourceFactory: factory as any }))

    act(() => {
      const es = factory.mock.results[0].value as MockEventSource
      es.emitError()
    })

    expect(result.current.error).toBeTruthy()
  })
})
