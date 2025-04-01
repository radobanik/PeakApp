import { RouteWhere } from "../../repositories/route.repository";
import { validateListParams } from "../common/listParams";
import { IncommingRouteListParams, NonNullRouteListParams } from "../route";
import { defaultRouteListParams } from "../route/routeList";

type ClimbingObjectList = {
    id: string;
    name: string;
    longitude: number;
    latitude: number;
    routeCount: number;
};

type ClimbingObjectListQueryOutput = {
    id: string;
    name: string;
    longitude: number;
    latitude: number;
    _count: {
        routes: number;
    };
};

const selector = (routeWhere: RouteWhere) => ({
    id: true,
    name: true,
    longitude: true,
    latitude: true,
    _count: {
      select: {
        routes: {
          where: routeWhere,
        }
      },
    },
});

type IncommingClimbingObjectListParams = {
    climbingObjectName: string | null;
} & IncommingRouteListParams; // it is basically the same as route list params

type NonNullClimbingObjectListParams = {
    climbingObjectName: string;
} & NonNullRouteListParams; // it is basically the same as route list params

const validSortFields = ['name'];

const validateClimbingObjectListParams = (params: NonNullClimbingObjectListParams) => {
    validateListParams(params, validSortFields);
}

const defaultClimbingObjectListParams = (params: IncommingClimbingObjectListParams): NonNullClimbingObjectListParams => {
    return {
        climbingObjectName: params.climbingObjectName || '',
        ...defaultRouteListParams(params),
    }
}

const toClimbingObjectList = (climbingObject: ClimbingObjectListQueryOutput): ClimbingObjectList => {
    return {
        id: climbingObject.id,
        name: climbingObject.name,
        longitude: climbingObject.longitude,
        latitude: climbingObject.latitude,
        routeCount: climbingObject._count.routes,
    };
}

export type {
    ClimbingObjectList,
    ClimbingObjectListQueryOutput,
    IncommingClimbingObjectListParams,
    NonNullClimbingObjectListParams
};
export { selector, toClimbingObjectList, validateClimbingObjectListParams, defaultClimbingObjectListParams };
