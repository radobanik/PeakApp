import { pageRoutes } from "./pageRoutes";
import { NavigateFunction } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";

const LoginFallback = LoginPage;

export function navigateToPage(
    Component: React.ComponentType,
    navigate: NavigateFunction,
    options?: {
        requireAuth?: boolean;
        fallback?: React.ComponentType;
        replace?: boolean;
    }
    ) {
    const token = localStorage.getItem("token");
    const targetPath = pageRoutes.get(Component);

    if (!targetPath) {
        console.warn("No route found for component:", Component.name);
        return;
    }

    if (options?.requireAuth && !token) {
        const fallbackPath = pageRoutes.get(options?.fallback ?? LoginFallback);

        if (!fallbackPath) {
            navigate("/", { replace: true });
        } else {
            navigate(fallbackPath, { replace: options?.replace ?? false });
        }

        return;
    }

    navigate(targetPath, { replace: options?.replace ?? false });
}
