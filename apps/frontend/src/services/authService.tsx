// src/services/authService.ts
import { LoginRequest, LoginResponse, RegisterRequest } from "@/types/authTypes";
import { API } from "@/constants/api";
import { navigateToPage } from "@/routing/navigator";
import { NavigateFunction } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import { api } from "./index";

export async function login(
    credentials: LoginRequest,
    navigate: NavigateFunction
): Promise<LoginResponse> {
    try {
        const response = await api.post<LoginResponse>(API.AUTH.LOGIN, credentials);
        const data = response.data;

        localStorage.setItem("token", data.token);

        navigateToPage(HomePage, navigate, {
            requireAuth: true,
            replace: true,
        });

        return data;
    } catch (error: any) {
        const message =
        error.response?.data?.message || error.message || "Login failed";
        throw new Error(message);
    }
}

export function logout(navigate: NavigateFunction) {
    localStorage.removeItem("token");
    navigateToPage(LoginPage, navigate, { replace: true });
}

export async function register(
    credentials: RegisterRequest,
    navigate: NavigateFunction
): Promise<LoginResponse> {
    try {
        const response = await api.post<LoginResponse>(API.AUTH.REGISTER, credentials);
        const data = response.data;

        localStorage.setItem("token", data.token);

        navigateToPage(HomePage, navigate, {
            requireAuth: true,
            replace: true,
        });

        return data;
    } catch (error: any) {
        const message =
            error.response?.data?.message || error.message || "Registration failed";
        throw new Error(message);
    }
}
