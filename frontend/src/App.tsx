import RegistrationsPage from "./pages/RegistrationsPage";

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 py-4">
          <h1 className="text-xl font-semibold">Car Show 2027</h1>
        </div>
      </header>
      <RegistrationsPage />
    </div>
  );
}
