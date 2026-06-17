import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-3">
        <div className="mx-auto max-w-7xl">
          <span className="text-lg font-semibold text-gray-900">BFSI App</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
