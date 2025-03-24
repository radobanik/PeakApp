import z from "zod";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    created: Date;
    updated: Date | null;
    deleted: boolean;
}

interface UserCreate {
    firstName: string;
    lastName: string;
    email: string;
}

const validateUserCreate = (entity: UserCreate) => z.object({
    firstName: z.string().min(1, 'First name must not be empty'),
    lastName: z.string().min(1, 'Last name must not be empty'),
    email: z.string().email('Invalid email address'),
  }).strict().safeParse(entity);

interface UserUpdate {
    firstName: string;
    lastName: string;
}

const validateUserUpdate = (entity: UserUpdate) => z.object({
    firstName: z.string().min(1, 'First name must not be empty'),
    lastName: z.string().min(1, 'Last name must not be empty'),
  }).strict().safeParse(entity);

interface UserList {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const validSortFields = ['firstName', 'lastName', 'email'];

export { 
  User,
  UserCreate,
  UserUpdate,
  UserList,

  validateUserUpdate,
  validateUserCreate,

  validSortFields,
};
