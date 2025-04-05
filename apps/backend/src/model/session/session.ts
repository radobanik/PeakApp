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

export type { Session };
