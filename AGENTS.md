PRP: Multi-Agent Orchestration Hub with Voice + Notion/Supabase Integration

## Goal

Build an extensible AI agent Next.js. web app with a production-ready multi-agent system where users can with a Master Agent (Business Strategist) that delegates to specialized agents based on user input (via chat or voice).

Supabase integration to handle (auth, db, vector store)

Notion MCP

OpenAI’s voice APIs.

## Why

Centralize business operations via natural AI interface
Enable orchestrated multi-agent workflows (planning, research, writing, task creation)
Provide flexible, modular architecture to expand agent types
Seamlessly bridge structured backend (Supabase) and user workspace (Notion)
Support natural interaction through voice + text

## What

- Authentication (Supabase)
- Users input queries in chat ui
    - Voice or Chat
    - Document upload capability
- Results stream back to the user in real-time with agent trace metadata
- Short-term and long-term memory
- Chat histories stored in Supabase tables
- Chat history frontend ui
- File uploader allowing users to add documents to Supabase vector store

- Master Agent delegates to specialized agents as needed
- Research Agent searches using Brave API and Supabase vector store
- Documentation Agent
    - Crawl4ai MCP Rag Server activated
- Sales agent
    - Lead enrichment with Apollo

**New Project Plan Process**

If instructed to “Create Project Plan”, complete the following steps:

1. Create a PLANNING.md. Includes the project scope, high-level vision, architecture, constraints, tech stack, tools, etc.
2. Create a TASKS.md file. Tracks current tasks, backlog, and sub-tasks. Includes: Bullet list of active work, milestones, and anything discovered mid-process.

**Project Awareness & Context**

- Always read `PLANNING.md` at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- Check `TASK.md` before starting a new task. If the task isn’t listed, add it with a brief description and today's date.
- Always use Context7 to review most recent documentation prior to writing new code.
- Use consistent naming conventions, file structure, and architecture patterns as described in `PLANNING.md`.

**Documentation & Explainability**

- Update `README.md` when new features are added, dependencies change, or setup steps are modified.
- Comment non-obvious code and ensure everything is understandable to an entry-level developer.
- When writing complex logic, add an inline `# Reason:` comment** explaining the why, not just the what.
- Mark completed tasks in `TASK.md` immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `TASK.md` under a “Discovered During Work” section.

**Code Structure & Modularity**

- Never create a file longer than 500 lines of code. If a file approaches this limit, refactor by splitting it into modules or helper files.
- Organize code into clearly separated modules, grouped by feature or responsibility.
- Use clear, consistent imports** (prefer relative imports within packages).

**Testing & Reliability**

- Always create Pytest unit tests for new features (functions, classes, routes, etc).
- After updating any logic, check whether existing unit tests need to be updated. If so, do it.
- Tests should live in a `/tests` folder mirroring the main app structure.

Include at least:

- 1 test for expected use
- 1 edge case
- 1 failure case

**AI Behavior Rules**

- Never assume missing context. Ask questions if uncertain.
- Never hallucinate libraries or functions** – only use known, verified Python packages.
- Always confirm file paths and module names exist before referencing them in code or tests.
- Never delete or overwrite existing code unless explicitly instructed to or if part of a task from `TASK.md`.