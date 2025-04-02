export interface LoginResponse {
    message: string;
    token: string;
    user: AuthenticatedUser;
}

export interface AuthenticatedUser {
    id: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
    birthdayAt: string | null;
    height: number | null;
    weight: number | null;
    city: string | null;
    state: string | null;
    countryCode: string | null;
    createdAt: string;
    updatedAt: string | null;
}