import { Difficulty, User } from "@prisma/client";
import { Route, RouteDetail, routeDetailSelector, RouteList, routeListSelector } from "../route";
import { Session } from "../session/session";
import { sessionSelector } from "../session";
import { UserLabeled, userLabeledSelector } from "../user";

type ActivityDetail = {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: UserLabeled;

    climbedAt: Date;
    reviewStars: number;
    reviewText: string;
    numOfAttempts: number;
    perceivedDifficulty: Difficulty;
    notes: string;
    topped: boolean;

    route: RouteList;
};

const selector = {
    id: true,
    createdAt: true,
    updatedAt: true,
    createdBy: {
        select: userLabeledSelector
    },
    climbedAt: true,
    reviewStars: true,
    reviewText: true,
    numOfAttempts: true,
    perceivedDifficulty: true,
    notes: true,
    topped: true,
    route: {
        select: routeListSelector
    }
};

export type { ActivityDetail };
export { selector }
