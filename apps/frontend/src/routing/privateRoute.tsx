import { Navigate, useLocation } from "react-router-dom";
import { ROUTE } from "@/constants/routes";
import type { JSX } from "react";
import type { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
    const token = localStorage.getItem("token");
    const location = useLocation();

    return token ? <>{children}</> : <Navigate to={ROUTE.LOGIN} state={{ from: location }} replace />;
}

export function privateRoute(component: JSX.Element): JSX.Element {
    return <PrivateRoute>{component}</PrivateRoute>;
}
