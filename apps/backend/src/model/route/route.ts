import { ClimbingStructureType } from "@prisma/client";
import { Grade } from "../grade";
import { PeakFile } from "../peakFile";
import { User } from "../user";
import { OverlayPoint } from "./overlayPoint/overlayPoint";

type Route = {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    deleted: boolean;
    createdBy: User;
    updatedBy: User | null;

    name: string;
    description: string;
    grade: Grade;
    climbingStructureType: ClimbingStructureType;

    longitude: number;
    latitude: number;

    image: PeakFile | null;
    additionalImages: PeakFile[];
    overlay: OverlayPoint;
}

export type { Route };
