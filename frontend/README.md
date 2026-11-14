
#What is in it, in simple words

How to run the app, with npm install and npm run dev
The features and the folder structure
How to switch between sample data and the real API (the PDF asks for this)
The 2 API requests the dashboard uses


# Car Show Registration System – Frontend

React dashboard for the Car Show 2027 registration system.
Event staff use it to see the numbers (KPI cards) and to browse, search and filter registrations.

## Technologies

- React (Vite)
- TypeScript
- Tailwind CSS

## How to run

1. Install Node.js.
2. Open a terminal in the `frontend/` folder.
3. Install the packages:

   ```
   npm install
   ```

4. Start the app:

   ```
   npm run dev
   ```

5. Open http://localhost:5173

To check for errors before you commit:

```
npm run build
```

## Features

- 5 KPI cards: Total Registrations, Total Payments, Uncollected Payments, Confirmed, Checked In
- Registrations table with colored status and payment badges
- Search by participant name (waits 400 ms after typing stops)
- Filter by type and by status, with a Clear filters button
- Page buttons, a "Showing x–y of N" summary, and a page-size choice (5, 10, 20)
- Loading message, empty message, and error message with a Try again button

## Project structure

```
src/
├── api/          sampleData.ts and registrationsApi.ts
├── components/   KPI cards, filters, table, badges, pagination
├── hooks/        useDebounce
├── pages/        RegistrationsPage (state and data fetching)
├── types/        TypeScript types that match the API
└── utils/        money and date formatting
```

## Sample data or real API

The dashboard can use sample data or the real C# API.
Both files have the same functions, `getRegistrations()` and `getSummary()`, and they return the same data shapes.

| File | What it does |
|---|---|
| `src/api/sampleData.ts` | 25 sample registrations. Filtering and paging happen in the browser. |
| `src/api/registrationsApi.ts` | Real `fetch` calls to the C# API. |

### Use the sample data (default)

In `src/pages/RegistrationsPage.tsx`, the import is:

```ts
import { getRegistrations, getSummary } from "../api/sampleData";
```

No backend is needed.

### Switch to the real API

1. Start the backend in another terminal:

   ```
   cd backend
   dotnet run --project Api
   ```

2. Copy the URL that the backend prints and put it in `frontend/.env.development`:

   ```
   VITE_API_BASE_URL=http://localhost:5205
   ```

3. In `src/pages/RegistrationsPage.tsx`, change the import to:

   ```ts
   import { getRegistrations, getSummary } from "../api/registrationsApi";
   ```

4. Stop `npm run dev` with Ctrl + C and start it again. Vite only reads the `.env` file when it starts.

If the page shows "Cannot reach the API", check that the backend is running, that the port in `.env.development` is correct, and that the backend allows CORS for http://localhost:5173.

## API used

| Request | Used for |
|---|---|
| `GET /api/registrations?participantName=&type=&status=&page=1&pageSize=10` | The table, filters and page buttons |
| `GET /api/registrations/summary` | The KPI cards |

The KPI cards use the summary endpoint. They are not added up from the rows on the page.