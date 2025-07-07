export function buildMcpSseUrl(token?: string) {
  const baseUrl = 'https://mcp.notion.com/sse';
  return token ? `${baseUrl}?token=${token}` : baseUrl;
}
