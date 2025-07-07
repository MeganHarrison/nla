import type { NextRequest } from 'next/server';
import { buildMcpSseUrl } from '@/lib/mcp';

export const runtime = 'edge'; // Ensures low-latency streaming

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Helper: Formats messages for Notion MCP API
const formatForMCP = (messages: ChatMessage[]) => ({
  messages: messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  })),
});

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages: ChatMessage[] };

  const token = process.env.MCP_TOKEN;
  const mcpRes = await fetch(buildMcpSseUrl(token), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formatForMCP(messages)),
  });

  if (!mcpRes.body) {
    return new Response('No response from Notion MCP', { status: 500 });
  }

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const reader = mcpRes.body.getReader();
  const decoder = new TextDecoder();

  // Relay MCP SSE stream to client as simple text
  (async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        // Notion MCP SSE may send "data: ..." lines
        // We'll strip prefix, ignore comments, and send only data
        for (const line of text.split('\n')) {
          if (line.startsWith('data:')) {
            const chunk = line.replace(/^data:\s*/, '');
            await writer.write(new TextEncoder().encode(chunk));
          }
        }
      }
    } catch (e) {
      // Optionally log error
    } finally {
      await writer.close();
    }
  })();

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
