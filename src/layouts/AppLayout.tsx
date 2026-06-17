import { Outlet, useNavigate } from 'react-router-dom';
import { clearAuthToken } from '@/lib/http';
import axiosInstance from '@/api/axiosInstance';
import { queryClient } from '@/api/queryClient';
import { ROUTES } from '@/constants/routes';

export function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken(axiosInstance);
    queryClient.clear();
    navigate(ROUTES.login, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 border-b bg-white px-6 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">BFSI App</span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            Sign Out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
