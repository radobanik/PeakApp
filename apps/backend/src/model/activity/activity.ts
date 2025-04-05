import { Difficulty, User } from "@prisma/client";
import { Route } from "../route";
import { Session } from "../session/session";
import { sessionSelector } from "../session";

type Activity = {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: User;

    climbedAt: Date;
    reviewStars: number;
    reviewText: string;
    numOfAttempts: number;
    perceivedDifficulty: Difficulty;
    notes: string;
    topped: boolean;

    session: Session;
    route: Route;
};

const selector = {
    id: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,

    climbedAt: true,
    reviewStars: true,
    reviewText: true,
    numOfAttempts: true,
    perceivedDifficulty: true,
    notes: true,
    topped: true,

    session: true,
    route: true,
}

export type { Activity };
export { selector}
