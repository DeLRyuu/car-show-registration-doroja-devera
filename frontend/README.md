# Car Show Registration System - Frontend

React dashboard for the Car Show 2027 registration system.
Event staff use it to see the numbers and to find registrations.

## Status

- The dashboard is finished and connected to the C# API.
- It was tested with the backend running on http://localhost:5205.
- The sample data is still in the project, and you can switch back to it (see "Real API or sample data").

## What is built

- A strip of 5 numbers at the top: Total registrations, Total payments, Uncollected payments, Confirmed, Checked in. They come from the summary request.
- A table of registrations with these columns: Reg. no., Date, Participant, Car, Type, Status, Fee / paid, Payment
- Search by participant name (it waits 400 ms after you stop typing)
- Filters for registration type and status, and a Clear filters button. The filtering is done by the API.
- Page buttons (Previous, Next, page numbers), a "Showing x-y of N" line, and a Per page choice (5, 10, 20)
- Loading rows while the data loads
- A message when nothing matches the filters, with a Clear filters button
- A message when the API cannot be reached, with a Try again button

## Design

- Font: Barlow (one font family everywhere)
- Colors: ink `#16212b`, steel blue `#2b5c8f`, paper `#f1f3f5`, line `#d5dae0`. Payment status uses red (Unpaid), amber (Partial) and green (Paid).
- Every status shows a word as well as a color, so color is never the only clue.
- Plate numbers are shown in a small box that looks like a license plate.
- Dates are shown in the local time of the browser. Amounts are shown in pesos.
- Pressing the Tab key shows a clear blue outline.
- On small screens the table scrolls sideways and the numbers wrap into columns.

## Technologies

- React (Vite)
- TypeScript
- Tailwind CSS

## How to run

You need Node.js (version 20 or newer) and the .NET 10 SDK. Open two terminals.

Terminal 1 - the backend:

```
cd backend
dotnet run --project Api
```

Wait for `Now listening on: http://localhost:5205`.

Terminal 2 - the dashboard:

```
cd frontend
npm install
npm run dev -- --port 5173 --strictPort
```

Open http://localhost:5173

The backend only allows the address http://localhost:5173, so keep `--strictPort`. If the port is busy, Vite stops instead of using another port.

To check for errors before you commit:

```
npm run build
```

## Project structure

```
src/
|-- api/          registrationsApi.ts (real API) and sampleData.ts (sample data)
|-- components/   KpiCard, KpiCards, RegistrationFilters, RegistrationTable,
|                 TableSkeleton, Pagination, StatusBadge, PaymentBadge
|-- hooks/        useDebounce
|-- pages/        RegistrationsPage (state and data fetching)
|-- types/        TypeScript types that match the API
+-- utils/        money and date formatting
```

## Real API or sample data

Both files in `src/api/` have the same functions, `getRegistrations()` and `getSummary()`, and they return the same data shapes.

| File | What it does |
|---|---|
| `src/api/registrationsApi.ts` | Real `fetch` calls to the C# API. This is the default. |
| `src/api/sampleData.ts` | 25 sample registrations. Filtering and paging happen in the browser. |

The API address is in `frontend/.env.development`:

```
VITE_API_BASE_URL=http://localhost:5205
```

Vite only reads this file when it starts, so stop `npm run dev` with Ctrl + C and start it again after you change it.

### Use the sample data (no backend needed)

In `src/pages/RegistrationsPage.tsx`, change the import to:

```ts
import { getRegistrations, getSummary } from "../api/sampleData";
```

### Use the real API (default)

In `src/pages/RegistrationsPage.tsx`, the import is:

```ts
import { getRegistrations, getSummary } from "../api/registrationsApi";
```

If the page shows "Cannot reach the API", check that the backend is running, that the port in `.env.development` is correct, and that the page is open at http://localhost:5173 (not 127.0.0.1).

## API used

| Request | Used for |
|---|---|
| `GET /api/registrations?participantName=&type=&status=&page=1&pageSize=10` | The table, filters and page buttons |
| `GET /api/registrations/summary` | The 5 numbers at the top |

The 5 numbers come from the summary request. They are not added up from the rows on the page.

## Screenshots

The screenshots for the documentation are in `docs/screenshots/`. The files of the frontend start with `fe-`.
