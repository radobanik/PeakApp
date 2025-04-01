import { Prisma, PrismaClient } from "@prisma/client";
import { RouteCreate, routeDetailSelector, RouteList, routeListSelector } from "../model/route";
import { authUserProvide } from "../services";
import { toConnector, toConnectorDisconnector, toConnectorNullable, xToManyCreator, xToManyUpdater } from "./utils/connector";
import { RefObject } from "../model/common/refObject";
import { createListResponse, ListResponse } from "../model/common/listResponse";

type RouteWhere = Prisma.RouteWhereInput;
type RouteOrder = Prisma.RouteOrderByWithRelationInput;

const routeClient = new PrismaClient().route;
const peakFileConnector = (image: RefObject) => ({ peakFile: toConnector(image) });


const listRoutes = async (where: RouteWhere, orderBy: RouteOrder[], pageNum: number, pageSize: number) : Promise<ListResponse<RouteList>> => {
    const routes : RouteList[] = await routeClient.findMany({
        where,
        orderBy,
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        select: routeListSelector,
    });

    const totalRoutes = await routeClient.count({ where });

    return createListResponse(routes, totalRoutes, pageNum, pageSize);
}

const getById = async (id: string) => {
    return await routeClient.findUnique({
        where: { 
            id : id,
            deleted: false,
        },
        select: routeDetailSelector,
    });
}

const create = async (route: RouteCreate) => {
    return await routeClient.create({
        data: {
            ...route,
            grade : toConnector(route.grade),
            image : toConnectorNullable(route.image),
            additionalImages: xToManyCreator(route.additionalImages, peakFileConnector),

            createdAt: new Date(),
            createdBy : toConnector(authUserProvide()),
        },
        select: routeDetailSelector,
    });
}

const update = async (id: string, route: RouteCreate) => {
    return await routeClient.update({
        where: { id },
        data: {
            ...route,
            grade : toConnector(route.grade),
            image : toConnectorDisconnector(route.image),
            additionalImages: xToManyUpdater(route.additionalImages, peakFileConnector),

            updatedAt: new Date(),
            updatedBy : toConnector(authUserProvide()),
        },
        select: routeDetailSelector,
    });
}

const deleteById = async (id: string) => {
    await routeClient.update({
        where: { id },
        data: {
            deleted: true,
            updatedAt: new Date(),
            updatedBy : toConnector(authUserProvide()),
        },
    });
}

const exists = async (id: string) => {
    const count = await routeClient.count({
        where: {
            id,
            deleted: false,
        },
    });
    return count > 0;
}

export type {
    RouteWhere,
    RouteOrder,
};

export default {
    listRoutes,
    getById,
    create,
    update,
    deleteById,
    exists,
};
