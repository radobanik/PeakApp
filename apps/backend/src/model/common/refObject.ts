import { z } from 'zod';

type RefObject = {
    id: string;
};

const refObjectSchema = z.object({
    id: z.string().uuid(),
}).strict();

export type { RefObject };
export { refObjectSchema };
