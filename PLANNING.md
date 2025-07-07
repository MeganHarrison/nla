### 1. Goal
Develop a production-ready AI agent in **Next.js** that connects to Notion's MCP server (`https://mcp.notion.com/sse`). The application must provide:
- A modern chat UI (`/components/ChatAgent.tsx`) with streaming message support.
- Long-term memory with chat history persisted in Supabase.
- Strict TypeScript and multi-agent scalability.
- Clean state management for history, streaming updates, and error handling.
- A sample chat page (`/app/chat/page.tsx`) demonstrating the flow.

### 2. High-Level Architecture
```
Browser (React/Next.js) <-> API Routes <-> Supabase DB
                                 |
                            Notion MCP SSE
```
1. **ChatAgent component** – chat interface with streaming support.
2. **Notion MCP SSE connection** – hook to `https://mcp.notion.com/sse` dispatching events to ChatAgent.
3. **Supabase** – stores users, chats, messages, and long‑term memory.
4. **Multi-Agent Support** – architecture allows specialized agents.
5. **State Management** – centralized store tracks chat state and streaming updates.

### 3. Key Components
- `/components/ChatAgent.tsx`
- `/app/chat/page.tsx`
- `lib/supabase/*` – Supabase client setup and DB types.
- `/hooks/use-notion-sse.ts` – connect to Notion MCP and expose events.
- API routes under `/app/(chat)/api/*` for chat operations.

### 4. Development Steps
1. Project setup with strict TypeScript and environment variables.
2. Implement Notion MCP integration via `useNotionSSE`.
3. Build the ChatAgent UI with streaming.
4. Persist chat history in Supabase.
5. Introduce global chat store and error handling.
6. Design for multi-agent scalability.
7. Provide `/app/chat/page.tsx` as an example.
8. Add unit tests for the SSE hook and state management.
9. Update `README.md` with setup instructions.

### 5. Constraints & Considerations
- Keep files under 500 lines; split when necessary.
- Use consistent imports with project aliases (`@/`).
- Ensure user authentication via Supabase before persisting history.
- Gracefully handle SSE disconnections and API errors.
