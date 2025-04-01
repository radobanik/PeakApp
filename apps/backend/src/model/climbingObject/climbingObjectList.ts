import { ClimbingStructureType } from "@prisma/client";
import { RouteWhere } from "../../repositories/route.repository";
import { toNumber } from "../common/listParams";
import { parseClimbingStructureTypes } from "../route";

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
    name: string | null;
    routeName: string | null;
    ratingFrom: number | null;
    ratingTo: number | null;
    latitudeFrom: number | null;
    latitudeTo: number | null;  
    longitudeFrom: number | null;
    longitudeTo: number | null;
    climbingStructureTypes: string | null;
};

type NonNullClimbingObjectListParams = {
    name: string;
    routeName: string;
    ratingFrom: number;
    ratingTo: number;
    latitudeFrom: number;
    latitudeTo: number;  
    longitudeFrom: number;
    longitudeTo: number;
    climbingStructureTypes: ClimbingStructureType[];
}

const defaultClimbingObjectListParams = (params: IncommingClimbingObjectListParams): NonNullClimbingObjectListParams => {
    return {
        name: params.name || '',
        routeName: params.routeName || '',
        ratingFrom: toNumber(params.ratingFrom, 0),
        ratingTo: toNumber(params.ratingTo, 10000000),
        latitudeFrom: toNumber(params.latitudeFrom, -90),
        latitudeTo: toNumber(params.latitudeTo, 90),
        longitudeFrom: toNumber(params.longitudeFrom, -180),
        longitudeTo: toNumber(params.longitudeTo, 180),
        climbingStructureTypes: parseClimbingStructureTypes(params.climbingStructureTypes),
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
export { selector, toClimbingObjectList, defaultClimbingObjectListParams };
