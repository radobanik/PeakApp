import { Navigate } from "react-router-dom";
import { ROUTE } from "@/constants/routes";
import type { JSX } from "react";
import type { ReactNode } from "react";

interface PublicRouteProps {
    children: ReactNode;
}

function PublicRoute({ children }: PublicRouteProps) {
    const token = localStorage.getItem("token");
    return token ? <Navigate to={ROUTE.HOME} replace /> : <>{children}</>;
}

export function publicRoute(component: JSX.Element): JSX.Element {
    return <PublicRoute>{component}</PublicRoute>;
}