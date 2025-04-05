import { User } from "@prisma/client";
import { PeakFile, peakFileSelector } from "../peakFile";
import { ActivityDetail, activityDetailSelector } from "../activity";
import { UserLabeled, userLabeledSelector } from "../user";

type SessionDetail = {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: UserLabeled;

    note: string;

    assignedActivities: ActivityDetail[];
    photos: PeakFile[];
};

const selector = {
    id: true,
    createdAt: true,
    updatedAt: true,
    createdBy: {
        select: userLabeledSelector
    },

    note: true,

    assignedActivities: {
        select: activityDetailSelector
    },
    photos: {
        select: {
            peakFile: {
                select : peakFileSelector, 
            },
        }
    },
}

export type { SessionDetail };
export { selector };
