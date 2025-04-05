import { User } from "@prisma/client";
import { Activity } from "../activity/activity";
import { PeakFile } from "../peakFile";

type Session = {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: User;

    note: string;

    assignedActivities: Activity[];
    photos: PeakFile[];
};

const selector = {
    id: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,

    note: true,

    assignedActivities: true,
    photos: true,
}

export type { Session };
export { selector };
