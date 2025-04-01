import config from "../../core/config";
import { ClimbingStructureType } from "@prisma/client";
import { IncommingListParams, NonNullListParams, parseArray, toNotNullListParams, validateListParams } from "../common/listParams";
import { GradeDetail, gradeDetailSelector } from "../grade";

type RouteList = {
    id: string;
    name: string;
    description: string;
    grade: GradeDetail;
    climbingStructureType: ClimbingStructureType;
    longitude: number;
    latitude: number;
}

const selector = {
    id: true,
    name: true,
    description: true,
    grade: {
        select : gradeDetailSelector,
    },
    climbingStructureType: true,
    longitude: true,
    latitude: true,
};

type IncommingRouteListParams = {
    name: string | null;
    ratingFrom: number | null;
    ratingTo: number | null;
    longitudeFrom: number | null;
    longitudeTo: number | null;
    latitudeFrom: number | null;
    latitudeTo: number | null;
    climbingStructureTypes: string | null;
} & IncommingListParams;

type NonNullRouteListParams = {
    name: string;
    ratingFrom: number;
    ratingTo: number;
    longitudeFrom: number;
    longitudeTo: number;
    latitudeFrom: number;
    latitudeTo: number;
    climbingStructureTypes: ClimbingStructureType[];
} & NonNullListParams;

const validSortFields = ['name', 'rating'];

const validateRouteListParams = (params: NonNullRouteListParams) => {
    validateListParams(params, validSortFields);
}

const defaultRouteListParams = (params: IncommingRouteListParams): NonNullRouteListParams => {
    const { name, ratingFrom, ratingTo, longitudeFrom, longitudeTo, latitudeFrom, latitudeTo, climbingStructureTypes, ...listParams } = params;

    // String -> Enum
    const types : ClimbingStructureType[] = parseArray(climbingStructureTypes).map((value) => {
        if (Object.values(ClimbingStructureType).includes(value as ClimbingStructureType)) {
          return value as ClimbingStructureType;
        } else {
          throw new Error(`Invalid climbing structure type: ${value}`);
        }
      });

    
    return {
        name: name || '',
        ratingFrom: ratingFrom || 0,
        ratingTo: ratingTo || 69696969,
        longitudeFrom: longitudeFrom || -180,
        longitudeTo: longitudeTo || 180,
        latitudeFrom: latitudeFrom || -90,
        latitudeTo: latitudeTo || 90,
        climbingStructureTypes: types,
        ...toNotNullListParams(listParams, config.listLimit.route),
    };
}

export type { RouteList, IncommingRouteListParams, NonNullRouteListParams };
export { selector, defaultRouteListParams, validateRouteListParams };