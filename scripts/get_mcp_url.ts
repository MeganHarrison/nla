import { buildMcpSseUrl } from '../lib/mcp';

const token = process.env.MCP_TOKEN;
console.log(buildMcpSseUrl(token));
