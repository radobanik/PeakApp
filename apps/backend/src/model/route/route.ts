import { ClimbingStructureType } from "./climbingStructureType";
import { Grade } from "../grade";
import { PeakFile } from "../peakFile";
import { User } from "../user";
import { Overlay } from "./overlayPoint/overlayPoint";

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
    overlay: Overlay;
}

export type { Route };
