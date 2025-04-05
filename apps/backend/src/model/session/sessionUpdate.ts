import { z } from "zod";
import { PeakFile, peakFileSelector } from "../peakFile";
import { RefObject, refObjectSchema } from "../common/refObject";

type SessionUpdate = {
    note: string;
    photos: RefObject[];
};


const validate = (entity: SessionUpdate) => z.object({
    note: z.string().max(500, 'Note must be at most 500 characters long.'),
    photos: z.array(refObjectSchema),
}).strict().safeParse(entity);

export type { SessionUpdate };
export { validate };
