import { Prisma, PrismaClient } from "@prisma/client";
import { activityDetailSelector, ActivityList, activityListSelector, ActivityCreate, ActivityUpdate, ActivityDetail } from "../model/activity";
import { createListResponse, ListResponse } from "../model/common/listResponse";
import { toConnector } from "./utils/connector";
import { RefObject } from "../model/common/refObject";

type ActivityWhere = Prisma.ActivityWhereInput;
type ActivityOrder = Prisma.ActivityOrderByWithRelationInput;

const activityClient = new PrismaClient().activity;

const getById = async (id: string) => {

    return activityClient.findUnique({
        where: {
            id: id
        },
        select: activityDetailSelector
    });
}

// Lists all unassigned activities
const list = async (pageNum: number, pageSize: number) : Promise<ListResponse<ActivityList>> => {
    const activities: ActivityList[] = await activityClient.findMany({
        where: {
            session: null,
        },
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
        select: activityListSelector,
    });

    const totalActivities = await activityClient.count();

    return createListResponse(activities, totalActivities, pageNum, pageSize);
}

const create = async (activityData: ActivityCreate, userRef: RefObject) : Promise<ActivityDetail> => {
    return await activityClient.create({
        data: {
            ...activityData,
            createdBy: toConnector(userRef),
            route: toConnector(activityData.route),
        },
        select: activityDetailSelector,
    });
}

const update = async (id: string, activityData: ActivityUpdate) : Promise<ActivityDetail> => {
    return await activityClient.update({
        where: { id },
        data: {
            ...activityData,
            updatedAt: new Date()
        },
        select: activityDetailSelector,
    })
}

const exists = async (id: string) : Promise<boolean> => {
    const count = await activityClient.count({
        where: {
            id : id
        }
    });
    return count > 0;
}

const deleteById = async (id: string) => {
    await activityClient.delete({
        where: {id }
    });
}

export default {
    getById,
    list,
    create,
    update,
    exists,
    deleteById,
}