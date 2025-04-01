import { RouteList, routeListSelector } from "../route";
import { UserLabeled, userLabeledSelector } from "../user";

type ClimbingObjectDetail = {
    id: string;

    createdAt: Date;
    updatedAt: Date | null;
    createdBy: UserLabeled;
    updatedBy: UserLabeled | null;

    name: string;
    longitude: number;
    latitude: number;

    routes: RouteList[];
};

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
    longitude: true,
    latitude: true,

    routes: {
        select: routeListSelector,
    },
};

export type { ClimbingObjectDetail };
export { selector };
