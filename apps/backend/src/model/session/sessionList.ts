import { ActivityDetail, activityDetailSelector } from "../activity";
import { UserLabeled, userLabeledSelector } from "../user";

type SessionList = {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: UserLabeled;

    note: string;

    assignedActivities: ActivityDetail[];
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
}

export type { SessionList };
export { selector };
