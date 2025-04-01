import { User } from "@prisma/client";
import { Route } from "../route";

type ClimbingObject = {
    id: string;
    createdAt: Date;
    updatedAt: Date | null;
    createdBy: User;
    updatedBy: User | null;
    deleted: boolean;

    name: string;
    longitude: number;
    latitude: number;

    routes: Route[];
};

export type { ClimbingObject };
