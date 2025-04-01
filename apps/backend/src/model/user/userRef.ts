type UserRef = {
    id: string;
    userName: string;
    
    firstName: string;
    lastName: string;
}

const selector = {
    id: true,
    userName: true,
    
    firstName: true,
    lastName: true,
}

export type { UserRef };
export { selector };
