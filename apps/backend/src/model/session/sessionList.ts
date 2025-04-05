import { User } from "@prisma/client";
import { PeakFile, peakFileSelector } from "../peakFile";
import { ActivityDetail, activityDetailSelector } from "../activity";

type SessionList = {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: User;

    note: string;

    assignedActivities: ActivityDetail[];
};

const selector = {
    id: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,

    note: true,

    assignedActivities: {
        select: activityDetailSelector
    },
}

export type { SessionList };
export { selector };
