import { ROUTE } from "@/constants/routes";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";

export const pageRoutes = new Map<React.ComponentType, string>([
    [HomePage, ROUTE.HOME],
    [LoginPage, ROUTE.LOGIN],
    [RegisterPage, ROUTE.REGISTER],
]);