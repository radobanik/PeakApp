import { Prisma, PrismaClient } from "@prisma/client";
import { activitySelector, ActivityList, activityListSelector, Activity, ActivityCreate } from "../model/activity";
import { createListResponse, ListResponse } from "../model/common/listResponse";
import { toConnector } from "./utils/connector";
import { RefObject } from "../model/common/refObject";

type ActivityWhere = Prisma.ActivityWhereInput;
type ActivityOrder = Prisma.ActivityOrderByWithRelationInput;

const activityClient = new PrismaClient().activity;

const getActivityById = async (id: string) => {
    return activityClient.findUnique({
        where: {
            id: id
        },
        select: activitySelector
    });
}

// Lists all unassigned activities
const listActivities = async (where : ActivityWhere, orderBy : ActivityOrder[], pageNum : number, pageSize : number) : Promise<ListResponse<ActivityList>> => {
    const activities: ActivityList[] = await activityClient.findMany({
        where,
        orderBy,
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        select: activityListSelector,
    });

    const totalActivities = await activityClient.count({ where });

    return createListResponse(activities, totalActivities, pageNum, pageSize);
}

const createActivity = async (activityData: ActivityCreate, userRef: RefObject) : Promise<Activity> => {
    return await activityClient.create({
        data: {
            ...activityData,
            createdBy: toConnector(userRef),
            Route: toConnector(activityData.route),
        },
        select: activitySelector,
    });
}

const update = async (id: string, activityData: ActivityCreate) : Promise<Activity> => {
    return await activityClient.update({
        where: { id },
        data: {
            ...activityData,
            Route: toConnector(activityData.route),
        },
        select: activitySelector,
    })
}

const deleteById = async (id: string) => {
    await activityClient.delete({
        where: {id }
    });
}