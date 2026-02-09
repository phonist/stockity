# Stockity

Stockity is a full-stack stock dashboard app with:
- A React + TypeScript client (`client/`)
- An Express + TypeScript API server (`server/`)
- MongoDB (used by auth/users/tickers persistence)

The UI focuses on a single dashboard route (`/`) and displays:
- Candlestick chart data
- Quote snapshot
- Quote summary table
- Latest insight reports

## Repository Layout

- `client/`: CRA-based React app (Redux Toolkit + MUI)
- `server/`: Express API (TypeScript, SWC build, Mongoose, Swagger)
- `docker-compose.yml`: local multi-service setup (`client`, `server`, `db`)

## Tech Stack

### Client
- React 17
- TypeScript
- Redux Toolkit / React Redux
- Material UI v5
- ApexCharts / Recharts
- Superagent

### Server
- Node.js + Express
- TypeScript
- SWC (build)
- Mongoose (MongoDB)
- Axios
- Swagger UI (`/api/docs`)
- Security middlewares: helmet, xss-clean, express-mongo-sanitize, rate-limit, cors

### Data Providers
- MarketStack: quotes, quote summary, autocomplete
- Finnhub: chart candles, insights/news

## Prerequisites

- Node.js `20` (see `.nvmrc`)
- npm or yarn
- MongoDB (if running without Docker)
- API keys:
  - `MARKET_STACK_API_KEY`
  - `FINNHUB_API_KEY`

## Environment Variables

### Client (`client/.env`)

Recommended values for local development:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_SERVER=http://localhost:8080
REACT_APP_HOST=localhost
PUBLIC_URL=
NODE_ENV=development
```

Notes:
- Client API modules call paths like `${REACT_APP_API_URL}/quotes/getQuote`.
- Server routes are mounted under `/api`.
- If `REACT_APP_API_URL` is omitted, client code falls back to `http://localhost:8080` (without `/api`), which does not match current server route mounting.

### Server (`server/.env`)

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/stockity
MONGO_CA_FILE=

CLIENT=http://localhost:3000
CLIENT_URL=http://localhost:3000
CLIENT_URLS=http://localhost:3000

ENVIRONMENT=development
NODE_ENV=development

JWT_SECRET=change-me
jwtSecret=change-me
JWT_EXPIRE=5 days

LOG_DIR=../logs
LOG_FORMAT=combined
SWAGGER_SERVER_URL=http://localhost:8080

MARKET_STACK_API_KEY=
FINNHUB_API_KEY=
```

Note:
- If `PORT` is not set, server config defaults to `8001` (`server/src/config/env.ts`).

## Running Locally (Without Docker)

### 1) Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2) Start backend

```bash
cd server
npm run dev
```

This runs `ts-node` via `nodemon` from `src/server.ts`.

### 3) Start frontend

```bash
cd client
npm start
```

Frontend runs on `http://localhost:3000` by default.

## Running with Docker Compose

From repository root:

```bash
docker compose up --build
```

Services:
- Client: `http://localhost:3000`
- Server: `http://localhost:8080`
- MongoDB: `mongodb://localhost:27017`

Compose also defines healthchecks and mounts source directories for iterative local development.

## Available Scripts

### Client (`client/package.json`)
- `npm start`
- `npm run build`
- `npm test`
- `npm run eject`

### Server (`server/package.json`)
- `npm run dev`
- `npm run build`
- `npm start`
- `npm test`
- `npm run lint`
- `npm run lint:fix`
- `npm run deploy:dev`
- `npm run deploy:prod`

## API Surface (Current Routes)

Base URL (typical local setup): `http://localhost:8080/api`

### Market data / dashboard
- `POST /tickers/getChart`
- `POST /quotes/getQuote`
- `POST /quoteSummaries/getQuoteSummary`
- `POST /insights/getInsight`
- `POST /autocomplete/getAutocomplete`

### CRUD / auth
- `GET /tickers`
- `GET /tickers/:id`
- `POST /tickers`
- `PUT /tickers/:id`
- `DELETE /tickers/:id`

- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`

### Docs and health
- `GET /api/docs`
- `GET /api/docs.json`
- `GET /health`
- `GET /` (basic API status payload)

## Testing

### Client

```bash
cd client
npm test
```

### Server

```bash
cd server
npm test
```

Server tests are configured with `ts-jest` and target feature test files under `src/features/**/__tests__`.

## Notes on Current Behavior

- Dashboard is rendered at `/` and `*` routes in the client router.
- Ticker search in the top bar dispatches updates for chart, quote, quote summary, and insights slices.
- Quote/quote summary/insight payload handling in frontend is tightly coupled to current backend response shapes.

## License

This project is licensed under the MIT License. See `LICENSE`.
