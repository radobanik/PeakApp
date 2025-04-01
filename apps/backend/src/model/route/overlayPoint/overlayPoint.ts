import { z } from 'zod';

type OverlayPoint = {
  relX: number,
  relY: number,
}   

const overlayPointSchema = z.object({
    relX: z.number(),
    relY: z.number()
  }).required().strict();

export type { OverlayPoint };
export { overlayPointSchema };

