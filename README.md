# 🏥 HealthCare Central — AI Support Assistant POC

A full-stack POC featuring two core capabilities:
- **Patient Lookup** — search by Patient ID + Date of Birth to view medical history and payment records
- **AI Chat Assistant** — Claude-powered support bot that answers questions about the dashboard app

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | .NET 8 Web API |
| Database | SQLite (via EF Core) |
| AI | Claude 3 Haiku (Anthropic API) |

No SQL Server, Redis, Docker, or Azure setup required.

---

## 📸 Features

- 🔍 Patient lookup by ID + DOB with tabbed Medical History and Payment History views
- 💬 AI chat assistant with suggested questions and conversation history
- 🗄️ SQLite database auto-created and seeded with demo data on first run
- 🚀 Minimal setup — just add an API key and run two commands

---

## ⚡ Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org)
- Claude API key from [Anthropic Console](https://console.anthropic.com)

---

### 1. Add your Claude API key

Open `backend/appsettings.json` and replace `YOUR_API_KEY_HERE`:

```json
{
  "Anthropic": {
    "ApiKey": "sk-ant-..."
  }
}
```

---

### 2. Run the backend

```bash
cd backend
dotnet run
```

On first run it will:
- Create `healthcare_poc.db` (SQLite — no install needed)
- Auto-seed 3 demo patients
- Start on `http://localhost:5000`

---

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

---

## 🧪 Demo Patients

| Patient ID | Date of Birth | Name         |
|------------|---------------|--------------|
| PAT-001    | 1985-03-14    | Aarav Sharma |
| PAT-002    | 1992-07-28    | Priya Nair   |
| PAT-003    | 1978-11-05    | Kiran Desai  |

---

## 📁 Project Structure

```
SupportAssistantPOC/
├── backend/
│   ├── Controllers/
│   │   ├── PatientController.cs    # POST /api/patient/lookup
│   │   └── ChatController.cs       # POST /api/chat/message → Claude API
│   ├── Data/
│   │   └── AppDbContext.cs         # EF Core + SQLite
│   ├── Models/
│   │   └── Models.cs               # Entities + DTOs
│   ├── Services/
│   │   └── SeedService.cs          # Auto-seeds demo data on startup
│   ├── Program.cs                  # Entry point + auto-migrate + CORS
│   ├── appsettings.json            # ← Add Claude API key here
│   └── backend.csproj
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PatientLookup.jsx   # Patient search + history UI
│   │   │   └── ChatAssistant.jsx   # Chat UI with suggested questions
│   │   ├── services/
│   │   │   └── api.js              # API call helpers
│   │   ├── App.jsx                 # Main layout
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js              # Proxies /api → localhost:5000
└── README.md
```

---

## 🔌 API Endpoints

### `POST /api/patient/lookup`
```json
{
  "patientId": "PAT-001",
  "dateOfBirth": "1985-03-14"
}
```

### `POST /api/chat/message`
```json
{
  "message": "How do I check insurance eligibility?",
  "history": []
}
```

---

## 📝 Notes

- `appsettings.json` is excluded from version control — never commit your API key
- The SQLite `.db` file is auto-generated locally and excluded from the repo
- `bin/`, `obj/`, and `node_modules/` are excluded — run `dotnet run` and `npm install` to restore them
- Chat assistant is scoped to answer only questions about the HealthCare Central Dashboard

---

## 🙋 Built With

- [React](https://react.dev)
- [.NET 8](https://dotnet.microsoft.com)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [Claude AI by Anthropic](https://www.anthropic.com)
