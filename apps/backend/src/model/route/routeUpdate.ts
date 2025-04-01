import { z } from "zod";
import { ClimbingStructureType } from "@prisma/client";
import { RefObject, refObjectSchema } from "../common/refObject";
import { OverlayPoint, overlayPointSchema } from "./overlayPoint/overlayPoint";

type RouteUpdate = {
    name: string;
    description: string;
    grade: RefObject;
    climbingStructureType: ClimbingStructureType;

    longitude: number;
    latitude: number;

    image: RefObject | null;
    additionalImages: RefObject[];
    overlay: OverlayPoint[];
}

const validate = (entity: RouteUpdate) => z.object({
    name: z.string().min(1, 'Name must not be empty'),
    description: z.string().min(1, 'Description must not be empty'),
    grade: refObjectSchema,
    climbingStructureType: z.nativeEnum(ClimbingStructureType),
    longitude: z.number().min(-180, 'Longitude must be between -180 and 180').max(180, 'Longitude must be between -180 and 180'),
    latitude: z.number().min(-90, 'Latitude must be between -90 and 90').max(90, 'Latitude must be between -90 and 90'),
    image: refObjectSchema.nullable(),
    additionalImages: z.array(refObjectSchema),
    overlay: overlayPointSchema.array(),
  }).strict().safeParse(entity);

export type { RouteUpdate };
export { validate };
