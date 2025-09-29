# API Reference — DevKit Backend

This document describes the backend API surface used by the Conflux DevKit frontend. The API client is implemented in `src/services/api.ts` (DevKitApiService) and wraps a local backend service that exposes endpoints for devkit features: node control, mining, account management, contract deployment/interactions, and developer utilities.

Base URL
- In development the frontend proxies API requests to `/api` (see Vite proxy). The axios instance in `DevKitApiService` uses the configured base URL (process.env or runtime).

Authentication
- The client stores a `session` token in localStorage under `devkit_session`. The axios request interceptor attaches `Authorization: Bearer <session>` when present.
- A 401 response will cause the client to clear session state via `clearSession()`.

Top-level endpoints (conceptual mapping)
- GET /health — health check
- GET /status/public — public network status
- GET /status/devkit — devkit internal status
- Accounts
  - GET /accounts — list accounts
  - GET /accounts/:address — account details
  - GET /accounts/:address/balance — account balance
  - POST /accounts/sign — sign payload with devkit account

- Contracts
  - POST /contracts/deploy — deploy a contract (bytecode/abi/constructor args)
  - POST /contracts/read — read-only contract call
  - POST /contracts/write — write (state-changing) contract call
  - GET /contracts/:address — contract metadata/info

- Transactions
  - POST /transactions/send — send a transaction
  - POST /transactions/send/advanced — send a transaction with extended options
  - GET /transactions/history — list transaction history

- Node control & mining
  - POST /node/start — start the local node
  - POST /node/stop — stop the local node
  - POST /mining/start — start mining
  - POST /mining/stop — stop mining
  - POST /mining/set-interval — set mining interval
  - POST /mining/mine-blocks — mine one or more blocks immediately

- Network
  - POST /network/switch — switch the selected network
  - GET /network/current — get current network
  - GET /network/stats — network statistics

- Dev settings & maintenance
  - POST /dev/update — update developer settings
  - POST /dev/reset — reset dev environment
  - GET /ws/info — get websocket / ws proxy information

Error handling
- The axios instance maps common HTTP status codes into thrown errors with messages. Client code generally expects JSON error payloads with `message` and `code` when available.

Representative request/response examples

1) Deploy a contract

Request (POST /contracts/deploy)
- Body: { abi, bytecode, constructorArgs?, from?, gasLimit? }

Response
- 200: { txHash, contractAddress, receipt }

2) Read a contract (call)

Request (POST /contracts/read)
- Body: { to: contractAddress, abi, method: string, args?: any[] }

Response
- 200: { result } — the decoded result of the call

3) Send a transaction

Request (POST /transactions/send)
- Body: { from, to, value?, data?, gas?, gasPrice? }

Response
- 200: { txHash }

Notes and implementation details
- The DevKitApiService centralizes axios interceptors: it attaches Authorization if `devkit_session` exists in localStorage and on 401 will clear session state (so the UI can redirect to login or show disconnected state).
- Many endpoints accept flexible payloads; consult `src/services/api.ts` for exact parameter names and optional fields. The API wrapper functions in the file are the source of truth and include helpful parameter typings.

Where to look in the code
- Client wrapper: `src/services/api.ts` — all public methods and their request shapes are implemented there.
- Frontend usage examples: search the repo for `DevKitApiService` usages (e.g., account pages, contract pages, node control components).

TODO / Extensions
- Add example curl and JS/TS fetch snippets for each endpoint (can be auto-generated from the TypeScript types in `src/services/api.ts`).
- Document error payloads and common failure cases per endpoint.

End of API reference (high-level). For precise parameter names and types, see `src/services/api.ts`.
