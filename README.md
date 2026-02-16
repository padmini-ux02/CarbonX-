# CarbonX — Chatbot integration

This workspace adds a simple AI assistant to the site. It uses a small Node.js Express proxy that forwards messages to OpenAI's Chat Completions API.

Quick start (local):

1. Install dependencies:

```bash
npm install
```

2. Set your OpenAI API key (example for Windows cmd):

```cmd
set OPENAI_API_KEY=sk-...
```

3. Start the server (it serves the static site and the chat endpoint):

```bash
npm start
```

4. Open http://localhost:3000 in your browser. Click the "AI" button to open the chat.

Notes:
- The server expects `OPENAI_API_KEY` to be set as an environment variable. Do not commit your key.
- By default the server uses `gpt-3.5-turbo`. Override with `OPENAI_MODEL` env var.
- This example is minimal and intended for local/dev use. For production, secure the proxy, rate-limit, and validate inputs.
