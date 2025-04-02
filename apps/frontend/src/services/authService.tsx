// src/services/authService.ts
import { LoginResponse } from "@/types/authTypes";
import { API } from "@/constants/api";
import { navigateToPage } from "@/navigation/navigator";
import { NavigateFunction } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";

export async function login(
    email: string,
    password: string,
    navigate: NavigateFunction
): Promise<LoginResponse> {
    console.log("Logging in with email:", email, "and password:", password);
    console.log("API URL:", API.AUTH.LOGIN);
    const response = await fetch(API.AUTH.LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const text = await response.text();
    let data: LoginResponse;

    try {
        data = text ? JSON.parse(text) : { message: "", token: "", user: undefined as any };
    } catch (error) {
        throw new Error("Failed to parse server response");
    }

    if (!response.ok) {
        throw new Error(data?.message || "Login failed");
    }

    localStorage.setItem("token", data.token);

    navigateToPage(HomePage, navigate, {
        requireAuth: true,
        replace: true,
    });

    return data;
}

export function logout(navigate: NavigateFunction) {
    localStorage.removeItem("token");
    navigateToPage(LoginPage, navigate, { replace: true });
}
