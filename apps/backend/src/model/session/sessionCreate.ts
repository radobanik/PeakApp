import { z } from "zod";
import { RefObject, refObjectSchema } from "../common/refObject";

type SessionCreate = {
    note: string;
    photos: RefObject[];
};


const validate = (entity: SessionCreate) => z.object({
    note: z.string().max(500, 'Note must be at most 500 characters long.'),
    photos: z.array(refObjectSchema),
}).strict().safeParse(entity);

export type { SessionCreate };
export { validate };
