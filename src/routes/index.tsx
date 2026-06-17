import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { PublicLayout, AppLayout } from '@/layouts';
import { ProtectedRoute } from './ProtectedRoute';
import { NotFound } from '@/shared/NotFound';

const LoginPage = lazy(() => import('@/features/login'));
const Dashboard = lazy(() => import('@/shared/Dashboard').then((m) => ({ default: m.Dashboard })));

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.home} element={<LoginPage />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route
            path={ROUTES.dashboard}
            element={
              <ProtectedRoute permission="dashboard.view">
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path={ROUTES.notFound} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
