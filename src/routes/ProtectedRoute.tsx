import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface ProtectedRouteProps {
  permission: string;
  children: ReactNode;
}

// TODO: Replace with real auth/permission check from your auth store or context
function useAuth(): { isAuthenticated: boolean; permissions: string[] } {
  // Placeholder — wire to your real auth state
  return { isAuthenticated: true, permissions: [] };
}

function hasPermission(permissions: string[], required: string): boolean {
  // Wildcard or exact match. Refine per your RBAC model.
  return permissions.includes('*') || permissions.includes(required);
}

export function ProtectedRoute({ permission, children }: ProtectedRouteProps) {
  const { isAuthenticated, permissions } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (!hasPermission(permissions, permission)) {
    return <Navigate to={ROUTES.home} replace />;
  }

  return <>{children}</>;
}
