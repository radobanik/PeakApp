type User = {
    id: string;
    userName: string;
    password: string;
    email: string;
    
    firstName: string;
    lastName: string;

    birthdayAt: Date | null;
    height: number | null;
    weight: number | null;

    city: string | null;
    state: string | null;
    countryCode: string | null;

    createdAt: Date;
    updatedAt: Date | null;
    deleted: boolean;
}

export type { User };
