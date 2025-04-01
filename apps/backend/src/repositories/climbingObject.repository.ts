import { Prisma, PrismaClient } from "@prisma/client";
import { ClimbingObjectCreate, ClimbingObjectDetail, climbingObjectDetailSelector, ClimbingObjectList, ClimbingObjectListQueryOutput, climbingObjectListSelector, toClimbingObjectList } from "../model/climbingObject";
import { toConnector } from "./utils/connector";
import { RouteWhere } from "./route.repository";
import { routeListSelector } from "../model/route";
import { RefObject } from "../model/common/refObject";

type ClimbingObjectWhere = Prisma.ClimbingObjectWhereInput;
type ClimbingObjectOrder = Prisma.ClimbingObjectOrderByWithRelationInput;

const climbingObjectClient = new PrismaClient().climbingObject;

// idk why, but this redefinition worked (it is the same!!!), otherwise routeListSelector was selecting all fields
const detailSelector = {
    ...climbingObjectDetailSelector,
    routes: {
        select: routeListSelector,
    },
}

const list = async (where: ClimbingObjectWhere, routeWhere: RouteWhere, orderBy: ClimbingObjectOrder[]) : Promise<ClimbingObjectList[]> => {
    const routes : ClimbingObjectListQueryOutput[] = await climbingObjectClient.findMany({
        where,
        orderBy,
        select: climbingObjectListSelector(routeWhere),
    });

    return routes.map(toClimbingObjectList);
}

const getById = async (id: string): Promise<ClimbingObjectDetail | null> => {
    return await climbingObjectClient.findUnique({
        where: {
            id: id,
            deleted: false,
        },
        select: detailSelector,
    });
}

const create = async (climbingObject: ClimbingObjectCreate, userRef: RefObject): Promise<ClimbingObjectDetail> => {
    return await climbingObjectClient.create({
        data: {
            ...climbingObject,
            createdAt: new Date(),
            createdBy: toConnector(userRef),
        },
        select: detailSelector,
    });
}

const update = async (id: string, climbingObject: ClimbingObjectCreate, userRef: RefObject): Promise<ClimbingObjectDetail> => {
    return await climbingObjectClient.update({
        where: { id },
        data: {
            ...climbingObject,
            updatedAt: new Date(),
            updatedBy: toConnector(userRef),
        },
        select: detailSelector,
    });
}

const deleteById = async (id: string, userRef: RefObject): Promise<void> => {
    await climbingObjectClient.update({
        where: { id },
        data: {
            deleted: true,
            updatedAt: new Date(),
            updatedBy: toConnector(userRef),
        },
    });
}

const exists = async (id: string): Promise<boolean> => {
    const count = await climbingObjectClient.count({
        where: {
            id: id,
            deleted: false,
        },
    });
    return count > 0;
}

export type {
    ClimbingObjectWhere,
    ClimbingObjectOrder,
};

export default {
    list,
    getById,
    create,
    update,
    deleteById,
    exists,
};
