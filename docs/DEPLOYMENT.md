# Deployment Guide • Scam Tactic Detector

The **Scam Tactic Detector** is engineered as a unified full-stack application (React 18 Vite frontend + Node.js Express explainable NLP backend). It can be deployed in minutes to **Render**, **Vercel**, **Railway**, or any **Docker/Container** cloud platform for 100% free.

---

## Option 1: 1-Click Deployment on Render (Recommended)

Render hosts full-stack Node.js applications with free automated SSL certificates and continuous Git deployment.

### Steps:
1. Log in or sign up at [Render.com](https://dashboard.render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository:
   ```text
   https://github.com/Abhimancoder/mini-project-sem3-scam-tactic-detector
   ```
4. Render will automatically read `render.yaml` with the following configuration:
   - **Name:** `scam-tactic-detector`
   - **Environment:** `Node`
   - **Region:** Any (e.g., Oregon or Frankfurt)
   - **Branch:** `main`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
5. Click **Create Web Service**.
6. Within 2–3 minutes, your live production application will be online at:
   `https://scam-tactic-detector.onrender.com` (or your chosen service name).

---

## Option 2: 1-Click Deployment on Vercel

The repository includes a ready-to-deploy `vercel.json` and serverless adapter `api/index.js`.

### Steps:
1. Log in or sign up at [Vercel.com](https://vercel.com).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository: `Abhimancoder/mini-project-sem3-scam-tactic-detector`.
4. Leave the root directory as `./`. Vercel automatically detects `vercel.json`:
   - Builds frontend to `frontend/dist`
   - Routes `/api/*` to serverless function `api/index.js`
   - Routes all other traffic to `index.html` (React SPA)
5. Click **Deploy**.
6. Your app is instantly live on a `.vercel.app` domain.

---

## Option 3: Docker & Container Hosting (Railway, Fly.io, Cloud Run)

The repository provides a multi-stage production `Dockerfile`:

### Build and Run Locally with Docker:
```bash
# Build the Docker image
docker build -t scam-tactic-detector .

# Run the container
docker run -p 5000:5000 scam-tactic-detector
```
Access the application at `http://localhost:5000`.

---

## Local Development vs. Production Mode

| Mode | Command | Frontend URL | Backend API URL | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Development** | `npm run dev` | `http://localhost:5173` | `http://localhost:5000/api` | Hot Module Replacement (HMR) active |
| **Unified Production** | `npm run build && npm start` | `http://localhost:5000` | `http://localhost:5000/api` | Single port, static files served by Express |
| **Backend Test Suite** | `npm test` | N/A | Local Jest/Supertest | 9 suites, 42 tests passing |
| **Dataset Benchmark** | `npm run test:dataset` | N/A | Terminal CLI | 25 cases, 100% accuracy |
