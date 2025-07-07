'use client';

import { useState, useRef } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const McpAgent = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setLoading(true);

    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/mcp-agent', {
        method: 'POST',
        body: JSON.stringify({
          messages: newMessages,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortRef.current.signal,
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      let assistantMessage = '';
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = new TextDecoder().decode(value);
        assistantMessage += chunk;

        setMessages((prev) =>
          prev.map((msg, i) =>
            i === prev.length - 1 && msg.role === 'assistant'
              ? { ...msg, content: assistantMessage }
              : msg
          )
        );
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setLoading(false);
      abortRef.current = null;
      setInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleAbort = () => {
    abortRef.current?.abort();
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4 p-4">
      <div className="flex-1 overflow-y-auto border rounded-lg p-4 min-h-[300px] bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${
              msg.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-2xl shadow ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {loading && (
          <div className="animate-pulse text-gray-400">Thinking…</div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-xl p-3 text-base outline-none"
          placeholder="Type your message…"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white shadow"
        >
          Send
        </button>
        {loading && (
          <button
            type="button"
            onClick={handleAbort}
            className="px-2 py-2 rounded-xl bg-gray-200"
          >
            Stop
          </button>
        )}
      </form>
    </div>
  );
};
