import { ClimbingStructureType } from "@prisma/client"
import { GradeDetail, gradeDetailSelector } from "../grade";
import { PeakFile, peakFileSelector } from "../peakFile";
import { UserLabeled, userLabeledSelector } from "../user";
import { OverlayPoint } from "./overlayPoint/overlayPoint";

type RouteDetail = {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: UserLabeled;
    updatedBy: UserLabeled | null;

    name: string;
    description: string;
    grade: GradeDetail;
    climbingStructureType: ClimbingStructureType;

    longitude: number;
    latitude: number;

    image: PeakFile | null;
    additionalImages: PeakFile[];
    overlay: OverlayPoint[];
}

const selector = {
    id: true,
    createdAt: true,
    updatedAt: true,
    createdBy: {
        select: userLabeledSelector,
    },
    updatedBy: {
        select: userLabeledSelector,
    },
    name: true,
    description: true,
    grade: {
        select : gradeDetailSelector,
    },
    climbingStructureType: true,
    longitude: true,
    latitude: true,
    image: true,
    additionalImages: {
        select: {
            peakFile: {
                select : peakFileSelector, 
            },
        }
    },
    overlay: true,
};

export type { RouteDetail };
export { selector };
