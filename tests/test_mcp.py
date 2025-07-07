import os
import subprocess

SCRIPT = os.path.join(os.path.dirname(__file__), '..', 'scripts', 'get_mcp_url.ts')


def run_script(env=None):
    env_vars = os.environ.copy()
    if env:
        env_vars.update(env)
    result = subprocess.check_output(['npx', '--yes', 'tsx', SCRIPT], env=env_vars)
    return result.decode().strip()


def test_url_with_token():
    url = run_script({'MCP_TOKEN': 'abc'})
    assert url == 'https://mcp.notion.com/sse?token=abc'


def test_url_without_token():
    url = run_script({})
    assert url == 'https://mcp.notion.com/sse'
