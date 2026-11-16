# Car Show Registration System (Car Show 2027)

A full-stack registration system built for the AutoVista Events **Car Show 2027**, a three-day automotive event hosted at the Sorsogon City Coliseum. The system manages participants registering as Exhibitors, Competitors, and VIPs, automating fee calculation, sequential numbering, status tracking, and dashboard KPIs.

---

## Team & Roles

| Member | Role |
| :--- | :--- |
| **Whindell Doroja** | Backend Developer |
| **Andrew DeVera** | Frontend Developer |

---

## Tech Stack

- **Backend API:** C# / .NET 10 Minimal APIs, Vertical Slice Architecture, Entity Framework Core 10 (SQLite), FluentValidation, Scalar OpenAPI
- **Frontend Dashboard:** React 19 (Vite), TypeScript, Tailwind CSS
- **Database:** SQLite (`carshow.db`)

---

## Repository Layout

```text
car-show-registration/
├── backend/            # .NET 10 Vertical Slice API solution
│   ├── Api/            # Endpoints, configurations, filters, migrations, SQLite DB
│   ├── Application/    # Feature slices (Commands, Queries, Handlers, Validators)
│   ├── Domain/         # Entities, Enums, Result patterns
│   └── Infrastructure/ # EF Core AppDbContext, configurations, database seeder
├── frontend/           # React + Vite + Tailwind CSS dashboard application
│   ├── src/            # Components, hooks, API client, pages, types
│   └── package.json
├── docs/               # Documentation assets
│   └── screenshots/    # API & application verification screenshots
└── README.md           # Project documentation, team roles, and setup guide
```

---

## How to Run Both Applications

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18+ or v20+) & npm

---

### 1. Run the Backend (.NET API)

Open a terminal and navigate to the `backend` folder:

```bash
cd backend
dotnet run --project Api
```

- **Base URL:** `http://localhost:5205`
- **Scalar API Reference:** `http://localhost:5205/scalar/v1`
- **OpenAPI JSON:** `http://localhost:5205/openapi/v1.json`

> **Note:** On first startup, EF Core migrations automatically create the SQLite database file (`carshow.db`) and seed 25 initial sample registrations covering all registration types and statuses.

---

### 2. Run the Frontend (React + Vite)

Open a second terminal and navigate to the `frontend` folder:

```bash
cd frontend
npm install
npm run dev
```

- **Frontend URL:** `http://localhost:5173`
- The backend has CORS enabled for `http://localhost:5173`.

---

## API Endpoints Overview

All endpoints are grouped under `/api/registrations`:

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `POST` | `/api/registrations` | Create a new registration (validates inputs, assigns sequential number & fee) |
| `GET` | `/api/registrations` | Get paginated list of registrations (supports `participantName`, `type`, `status`, `page`, `pageSize`) |
| `GET` | `/api/registrations/{id}` | Get single registration details by GUID |
| `GET` | `/api/registrations/summary` | Get KPI totals (status counts and financial totals; cancelled excluded from finances) |

---

## Business Rules

1. **Registration Number:** Auto-generated sequentially (`CS27-0001`, `CS27-0002`, ...).
2. **Registration Fee:** Determined strictly server-side by registration type:
   - **Exhibitor:** ₱1,500
   - **Competitor:** ₱2,500
   - **VIP:** ₱5,000
3. **Duplicate Plate Protection:** Attempting to register an existing plate number returns `409 Conflict`.
4. **Amount Paid & Payment Status:**
   - Amount paid must be between `0` and the registration fee.
   - Payment status is computed dynamically:
     - `Unpaid` if amount paid = 0
     - `Partial` if 0 < amount paid < fee
     - `Paid` if amount paid = fee
