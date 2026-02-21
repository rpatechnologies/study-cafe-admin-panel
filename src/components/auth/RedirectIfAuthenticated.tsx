import { Navigate, useSearchParams } from "react-router";
import { useAuthOptional } from "../../context/AuthContext";

/**
 * Use on sign-in/sign-up pages: redirect to dashboard (or ?redirect=) if already logged in.
 */
export function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
  const auth = useAuthOptional();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/";

  if (auth?.isInitialized && auth?.isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
