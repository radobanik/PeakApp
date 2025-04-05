import { Difficulty, User } from "@prisma/client";
import { Route, RouteDetail, routeDetailSelector, RouteList, routeListSelector } from "../route";

type ActivityList = {
    id: string;

    climbedAt: Date;
    numOfAttempts: number;
    perceivedDifficulty: Difficulty;
    notes: string;
    topped: boolean;

    route: RouteList;
}

const selector = {
    id: true,

    climbedAt: true,
    numOfAttempts: true,
    perceivedDifficulty: true,
    notes: true,
    topped: true,

    route: {
        select: routeListSelector,
    }
}

export type { ActivityList };
export { selector}
