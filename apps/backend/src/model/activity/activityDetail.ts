import { Difficulty, User } from "@prisma/client";
import { SessionList, sessionListSelector, sessionMinimalSelector } from "../session";
import { UserLabeled, userLabeledSelector } from "../user";
import { RouteList, routeListSelector } from "../route";
import { SessionMinimal } from "../session/sessionMinimal";

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
    session: SessionMinimal | null;
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
    },
    session: {
        select: sessionMinimalSelector
    }
};

export type { ActivityDetail };
export { selector }
