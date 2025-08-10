## Summer 2025 Internships – Backend quickstart

### Prerequisites
- Python 3.10+
- MongoDB running (local or hosted). Example URI: `mongodb://localhost:27017`

### Setup
```bash
cd Summer2025-Internships

# 1) Create and activate a virtual environment
python3 -m venv backend/venv
source backend/venv/bin/activate

# 2) Install dependencies
pip install -r requirements.txt

# 3) Create .env at the repo root (same level as this README)
cat > .env << 'EOF'
SECRET_KEY=change_me
MONGODB_URL=mongodb://localhost:27017
SERVER_PORT=5174
# Optional
FRONTEND_URL=http://localhost:5173
EOF
```

### Run the backend (FastAPI)
Run from the project root so the `backend` package is importable.
```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 5174
```

- Interactive docs: `http://localhost:5174/docs`
- OpenAPI JSON: `http://localhost:5174/api/v1/openapi.json`
- Health check: `GET http://localhost:5174/health`

---

### Auth flow
- Obtain a token, then call protected endpoints with header `Authorization: Bearer <token>`

```bash
# Register
curl -X POST http://localhost:5174/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"username":"alice","email":"alice@example.com","password":"pass"}'

# Login (OAuth2 password flow)
curl -X POST http://localhost:5174/api/v1/auth/login \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'username=alice&password=pass'
```

---

### Available endpoints (summary)

- Auth (`/api/v1/auth`)
  - `POST /register` body: `{ username, email?, password }` → create user
  - `POST /login` form: `username`, `password` → returns `{ access_token, token_type }`

- Applications (`/api/v1/applications`) – requires Bearer token
  - `GET /` → returns saved application ids grouped by status
  - `POST /` body:
    ```json
    { "job_id": "string", "status": "applied|hidden", "value": true }
    ```

- Simplify integration (`/api/v1/simplify`) – requires Bearer token
  - `PUT /cookie` body: `{ "cookie": "<Simplify cookie string>" }` → save cookie for user
  - `GET /cookie` → returns saved cookie
  - `POST /refresh` → fetch tracker data from Simplify and cache parsed results
  - `GET /parsed` → returns parsed cached data for current user
  - `GET /tracker` header: `cookies: <raw cookie header string>` → fetches live tracker items

- Health
  - `GET /health` → `{ status, timestamp }`

Notes
- CORS is configured to allow `FRONTEND_URL` (defaults to `http://localhost:5173`).
- Ensure MongoDB is reachable at `MONGODB_URL` before starting the server.

