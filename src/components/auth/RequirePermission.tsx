import type { ReactNode } from "react";
import { Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { AccessDenied } from "./AccessDenied";

interface RequirePermissionProps {
  /** Require at least one of these permissions */
  permissions: string[];
  /** Render when access is denied */
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Renders children only if the current user has at least one of the given permissions.
 * super_admin bypasses the check. Use for module/sub-module level access.
 */
export function RequirePermission({
  permissions,
  fallback = null,
  children,
}: RequirePermissionProps) {
  const { hasAnyPermission } = useAuth();

  if (hasAnyPermission(permissions)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Route wrapper: renders <Outlet /> only if user has at least one of the given permissions;
 * otherwise renders AccessDenied. Use to protect a group of routes by permission.
 */
export function RequirePermissionRoute({
  permissions,
  fallback,
}: {
  permissions: string[];
  fallback?: ReactNode;
}) {
  return (
    <RequirePermission
      permissions={permissions}
      fallback={fallback ?? <AccessDenied />}
    >
      <Outlet />
    </RequirePermission>
  );
}

interface RequireRoleProps {
  /** Require at least one of these roles */
  roles: string[];
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Renders children only if the current user has at least one of the given roles.
 */
export function RequireRole({
  roles,
  fallback = null,
  children,
}: RequireRoleProps) {
  const { user, hasRole } = useAuth();

  if (!user) return <>{fallback}</>;
  if (roles.some((r) => hasRole(r))) return <>{children}</>;

  return <>{fallback}</>;
}
