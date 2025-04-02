import { ROUTE } from "@/constants/routes";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";

export const pageRoutes = new Map<React.ComponentType, string>([
    [HomePage, ROUTE.HOME],
    [LoginPage, ROUTE.LOGIN],
]);