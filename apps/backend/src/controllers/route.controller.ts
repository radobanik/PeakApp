import { Request, Response } from "express";
import { HTTP_STATUS } from "./utils/httpStatusCodes";
import { RouteRepository } from "../repositories";
import { defaultRouteListParams, IncommingRouteListParams, Route, RouteCreate, routeCreateValidate, RouteUpdate, routeUpdateValidate } from "../model/route";
import requestValidator from "../model/common/validator";
import { RouteOrder, RouteWhere } from "../repositories/route.repository";
import { parseSortAndOrderBy } from "../model/common/listParams";

const getById = async (req: Request, res: Response) => {
    const routeId = req.params.id;
    const route = await RouteRepository.getById(routeId);

    if (route == null) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Route not found" });
    } else {
        res.status(HTTP_STATUS.OK_200).json(route);
    }
}

const list = async (req: Request, res: Response) => {
    const params = req.query as unknown as IncommingRouteListParams;
    const normalizedParams = defaultRouteListParams(params);

    const where : RouteWhere = {
        AND: [
            {
                AND: [
                    { name: { contains: normalizedParams.name as string, mode: "insensitive" } },
                    { longitude: { gte: normalizedParams.longitudeFrom, lte: normalizedParams.longitudeTo } },
                    { latitude: { gte: normalizedParams.latitudeFrom, lte: normalizedParams.latitudeTo } },
                    { climbingStructureType: { in: normalizedParams.climbingStructureTypes } },
                    { grade: { rating: { gte: normalizedParams.ratingFrom, lte: normalizedParams.ratingTo } } },
                ],
            },
            {
                deleted: false,
            },
        ],
    }

    const orderBy: RouteOrder[] = parseSortAndOrderBy(normalizedParams.sort, normalizedParams.order);
    orderBy.push({ id: 'asc' });

    const routeListResult = await RouteRepository.listRoutes(where, orderBy, normalizedParams.page, normalizedParams.pageSize);
    res.status(HTTP_STATUS.OK_200).json(routeListResult);
}

const create = async (req: Request<RouteCreate>, res: Response) => {
    const routeData: RouteCreate = req.body;

    const validatedData = requestValidator(() => routeCreateValidate(routeData), res);
    if (!validatedData) return;

    const route = await RouteRepository.create(validatedData);
    res.status(HTTP_STATUS.CREATED_201).json(route);
}

const update = async (req: Request<{ id: string }, {}, RouteUpdate>, res: Response) => {
    const routeData = req.body;
    const routeId = req.params.id

    const validatedData = requestValidator(() => routeUpdateValidate(routeData), res);
    if (!validatedData) return;

    const exists = await RouteRepository.exists(routeId);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Route not found" });
        return;
    }

    const route = await RouteRepository.update(routeId, validatedData);
    res.status(HTTP_STATUS.OK_200).json(route);
}

const deleteById = async (req: Request, res: Response) => {
    const routeId = req.params.id;
    const exists = await RouteRepository.exists(routeId);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Route not found" });
        return;
    }

    await RouteRepository.deleteById(routeId);
    res.status(HTTP_STATUS.NO_CONTENT_204).send();
}

export default {
    getById,
    create,
    update,
    deleteById,
    list,
};
