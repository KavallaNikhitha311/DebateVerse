# DebateVerse — An Interactive Online Debate, Discussion, and Opinion-Sharing Platform

DebateVerse is a modern, responsive educational full-stack web application designed for students to participate in structured online debates, create debate topics, defend stances (Support vs. Oppose), submit arguments, cast peer votes, track leaderboard rankings, and sharpen their critical-thinking and communication skills.

---

## 🎨 Clean, Soft, Modern Visual Theme

DebateVerse uses a soft, light, elegant, and minimal design system:

| Design Token | Hex Code | Purpose |
|---|---|---|
| **Main Background** | `#FFFFFF` | Dominant page background |
| **Alternate Section** | `#F8FAFC` | Light, crisp background separation |
| **Card Background** | `#FFFFFF` | Pure white cards |
| **Primary Accent** | `#4F46E5` | Soft modern indigo for primary buttons and focus |
| **Primary Accent Tint** | `#EEF2FF` | Soft indigo tint for subtle highlights |
| **Affirmative / Support** | `#DCFCE7` / `#166534` | Soft sage mint badge and border |
| **Opposition / Oppose** | `#FEE2E2` / `#991B1B` | Soft muted coral badge and border |
| **Main Text** | `#0F172A` | Deep slate for accessible contrast |
| **Secondary Text** | `#64748B` | Muted slate grey for subtitles and metadata |
| **Borders** | `#E2E8F0` | Light dividers |
| **Card Shadows** | `rgba(15, 23, 42, 0.04)` | Gentle elevation without visual clutter |

---

## 🚀 How to Run DebateVerse in VS Code / IDE

You can run DebateVerse on your computer completely independently without any AI assistant.

### Method 1: One-Click Startup (Easiest)

Inside the `DebateVerse` folder, simply double-click:
```
start-all.bat
```
This automatically launches both the **Backend (Port 5000)** and **Frontend (Port 5173)** in separate command prompt windows!

---

### Method 2: Running via VS Code Terminal

Open the `DebateVerse` folder in **VS Code** (`File` > `Open Folder...` > select `DebateVerse`).

#### Step 1: Open Terminal in VS Code
Press `Ctrl + ` ` ` (Ctrl + Backtick) or go to **Terminal > New Terminal**.

#### Step 2: Start the Backend Server (Terminal 1)
In the terminal, run:
```bash
cd backend
npm start
```
You will see:
```
[Database] Connected to In-Memory MongoDB successfully
[Seeder] Successfully seeded student-friendly debates and books!
DebateVerse Backend Server running on Port 5000
Health Check: http://localhost:5000/api/health
```
*(Leave this terminal running. The backend has an automatic zero-config In-Memory MongoDB engine, so you do not even need to install or configure MongoDB separately!)*

#### Step 3: Start the React Frontend (Terminal 2)
Click the **`+`** icon on the top right of the terminal panel to open a **second terminal tab**, then run:
```bash
cd frontend
npm run dev
```
You will see:
```
  VITE v5.4.21  ready in 300 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### Step 4: Open in Your Browser
Open your browser (Chrome, Edge, Firefox) and navigate to:
- **`http://localhost:5173`** (Frontend with Hot Module Replacement)
- Or **`http://localhost:5000`** (Backend serving the production build)

---

### How to Stop the Project
In each terminal tab, press:
```bash
Ctrl + C
```
and type `Y` to terminate the process.

---

## 🔑 Pre-Seeded Demo Login Accounts

All demo accounts share the password: **`password123`**  
*(Quick-fill buttons are also available on the Login page for 1-click access)*

| Name | Email | Role / University |
|---|---|---|
| **Aarav Sharma** | `aarav@debateverse.edu` | Student (Delhi University) — 145 pts |
| **Diya Patel** | `diya@debateverse.edu` | Student (BITS Pilani) — 120 pts |
| **Rohan Verma** | `rohan@debateverse.edu` | Student (VIT University) — 95 pts |
| **Ananya Roy** | `ananya@debateverse.edu` | Student (Mumbai College) — 80 pts |
| **Admin Moderator** | `admin@debateverse.edu` | Platform Moderator — 200 pts |

---

## 🗣️ Relatable Student Debates Included

1. **"Should homework be banned in primary and middle schools?"** (Education & Schools)
2. **"Is social media doing more harm than good to teenagers?"** (Technology & AI)
3. **"Are online classes better than traditional in-person learning?"** (Education & Schools)
4. **"Should AI tools like ChatGPT be allowed for student homework and projects?"** (Technology & AI)
5. **"Should college education be completely free for all students?"** (Society & Life)
6. **"Is playing video games beneficial for mental skills or a waste of time?"** (Culture & Gaming)

---

## 📁 Project Folder Structure

```
DebateVerse/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── config/           # Database connection & seed data
│   │   ├── controllers/      # Debate, auth, book, analytics controllers
│   │   ├── models/           # Mongoose schemas (Debate, Student, Argument, etc.)
│   │   ├── routes/           # REST API routes
│   │   └── services/         # AI argument analysis engine
│   ├── package.json
│   └── .env
│
├── frontend/                 # React 18 + Vite SPA
│   ├── src/
│   │   ├── components/       # Navbar, Footer, DebateCard, CountdownTimer
│   │   ├── context/          # AuthContext
│   │   ├── pages/            # Home, Arena, DebateDetails, Prep Checklist, Leaderboard
│   │   ├── styles/           # theme.css (soft indigo / slate / mint)
│   │   └── services/         # API client
│   ├── dist/                 # Production build
│   └── package.json
│
├── angular-contact/          # Standalone Angular 16 Reactive Forms contact module
├── start-all.bat             # 1-click launcher for Windows
└── README.md
```
