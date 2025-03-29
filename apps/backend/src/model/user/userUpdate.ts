import { z } from 'zod';
import { User } from './user';

type UserUpdate = {
    firstName: string;
    lastName: string;

    birthdayAt: Date | null;
    height: number | null;
    weight: number | null;

    city: string | null;
    state: string | null;
    countryCode: string | null;
}

const validate = (entity: UserUpdate) => 
    z.object({
        firstName: z.string().min(1, 'First name must not be empty'),
        lastName: z.string().min(1, 'Last name must not be empty'),
        birthdayAt: z.coerce.date().nullable(),
        height: z.number().positive().nullable(),
        weight: z.number().positive().nullable(),
        city: z.string().nullable(),
        state: z.string().nullable(),
        countryCode: z.string().length(2, 'Country code must be exactly 2 characters').nullable(),
    }).strict().safeParse(entity);

export type { UserUpdate };
export { validate };
