import { z } from 'zod';

type ClimbingObjectUpdate = {
    name: string;
    longitude: number;
    latitude: number;
};

const validate = (entity: ClimbingObjectUpdate) => z.object({
    name: z.string().min(1, 'Name must not be empty'),
    longitude: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    latitude: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
}).strict().safeParse(entity);

export type { ClimbingObjectUpdate };
export { validate };
