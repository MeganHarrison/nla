### Current Tasks
- Set up Notion MCP SSE connection (`hooks/use-notion-sse.ts`).
- Implement ChatAgent UI (`components/ChatAgent.tsx`).
- Store chat history in Supabase.
- Create sample chat page (`/app/chat/page.tsx`).
- Unit tests for the SSE hook and chat state reducer.

### Backlog
- Voice input/output using OpenAI voice APIs.
- Document upload and vector search integration.
- Additional specialized agents (research, writing, etc.).
- Deployment configuration for Vercel.
- User settings page for managing MCP credentials.

### Discovered During Work
- `database.types.ts` currently contains CLI output instead of generated DB types. Regenerate this file from the Supabase schema.
