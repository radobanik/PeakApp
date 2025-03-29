type UserDetail = {
    id: string;
    userName: string;
    email: string;
    
    firstName: string;
    lastName: string;

    birthdayAt: Date | null;
    height: Number | null;
    weight: Number | null;

    city: string | null;
    state: string | null;
    countryCode: string | null;

    createdAt: Date;
    updatedAt: Date | null;
}

const selector = {
    id: true,
    userName: true,
    email: true,

    firstName: true,
    lastName: true,

    birthdayAt: true,
    height: true,
    weight: true,

    city: true,
    state: true,
    countryCode: true,

    createdAt: true,
    updatedAt: true,
}

export type { UserDetail };
export { selector };
