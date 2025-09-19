# FastAPI recommender (local)

This FastAPI app provides a small CSV-backed companies store and a simple recommendations endpoint used as a demo.

Quick start

1. Create a venv and install dependencies (from `/backend`):

```bash
./setup_venv.sh
```

2. Activate the virtual environment:

```bash
source venv/bin/activate
```

3. Run the FastAPI server (development):

```bash
uvicorn fastapi_app:app --host 0.0.0.0 --port 8000 --reload
```

Endpoints

- `GET /health` — health check
- `GET /companies` — list companies from `companies.csv`
- `POST /companies` — add company (body: JSON)
- `PUT /companies/{company_name}` — update company
- `DELETE /companies/{company_name}` — delete company
- `POST /recommendations` — recommend companies by `domain`
- `POST /upload_resume` — upload a PDF resume (multipart form)

Notes

- The app reads/writes `companies.csv` in the `backend` folder. Ensure the process has write permissions.
- The `recommendations` endpoint is a placeholder; integrate your ML service as needed.
