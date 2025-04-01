import config from "../../core/config";
import { ClimbingStructureType } from "@prisma/client";
import { IncommingListParams, NonNullListParams, parseArray, toNotNullListParams, toNumber, validateListParams } from "../common/listParams";
import { GradeDetail, gradeDetailSelector } from "../grade";
import { RouteOrder, RouteWhere } from "../../repositories/route.repository";

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
        ratingFrom: toNumber(ratingFrom, 0),
        ratingTo: toNumber(ratingTo, 69696969),
        longitudeFrom: toNumber(longitudeFrom, -180),
        longitudeTo: toNumber(longitudeTo, 180),
        latitudeFrom: toNumber(latitudeFrom, -90),
        latitudeTo: toNumber(latitudeTo, 90),
        // all types if none are provided
        climbingStructureTypes: types.length > 0 ? types : Object.values(ClimbingStructureType),
        ...toNotNullListParams(listParams, config.listLimit.route),
    };
}

const getRouteWhere = (params: NonNullRouteListParams): RouteWhere => {
    return {
      AND: [
        {
          AND: [
            { name: { contains: params.name as string, mode: "insensitive" } },
            { longitude: { gte: params.longitudeFrom, lte: params.longitudeTo } },
            { latitude: { gte: params.latitudeFrom, lte: params.latitudeTo } },
            { climbingStructureType: { in: params.climbingStructureTypes } },
            { grade: { rating: { gte: params.ratingFrom, lte: params.ratingTo } } },
          ],
        },
        {
          deleted: false,
        },
      ],
    }
  }


const getOrderBy = (sortFields: string[], orderDirections: string[]): RouteOrder[] => {
  return sortFields.map((field, index) => {
    const direction = orderDirections[index]?.toLowerCase() === 'desc' ? 'desc' : 'asc';
    
    switch (field) {
      case 'rating':
        return { grade: { rating: direction } };
      case 'name':
        return { name : direction };
      default:
        return { [field]: direction };
    }
  });
};

export type { RouteList, IncommingRouteListParams, NonNullRouteListParams };
export { selector, defaultRouteListParams, validateRouteListParams, getRouteWhere, getOrderBy};