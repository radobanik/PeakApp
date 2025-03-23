interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

interface UserCreate {
    firstName: string;
    lastName: string;
    email: string;
}

interface UserUpdate {
    firstName: string;
    lastName: string;
}

export { User, UserCreate, UserUpdate };
