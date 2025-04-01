import { Request, Response } from "express";
import { HTTP_STATUS } from "./utils/httpStatusCodes";
import { ClimbingObjectRepository } from "../repositories";
import { defaultClimbingObjectListParams, IncommingClimbingObjectListParams, ClimbingObjectCreate, climbingObjectCreateValidate, ClimbingObjectUpdate, climbingObjectUpdateValidate, NonNullClimbingObjectListParams } from "../model/climbingObject";
import requestValidator from "../model/common/validator";
import { ClimbingObjectOrder, ClimbingObjectWhere } from "../repositories/climbingObject.repository";
import { parseSortAndOrderBy } from "../model/common/listParams";
import { getRouteWhere, } from "../model/route";
import { RouteWhere } from "../repositories/route.repository";

const getById = async (req: Request, res: Response) => {
    const climbingObjectId = req.params.id;
    const climbingObject = await ClimbingObjectRepository.getById(climbingObjectId);

    if (climbingObject == null) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Climbing object not found" });
    } else {
        res.status(HTTP_STATUS.OK_200).json(climbingObject);
    }
}

const list = async (req: Request, res: Response) => {
    const params = req.query as unknown as IncommingClimbingObjectListParams;
    const normalizedParams : NonNullClimbingObjectListParams = defaultClimbingObjectListParams(params);

    const routeWhere: RouteWhere = getRouteWhere(normalizedParams);
    const where: ClimbingObjectWhere = {
        AND: [
            {
                AND: [
                    { name: { contains: normalizedParams.climbingObjectName as string, mode: "insensitive" } },
                    { routes : { some: routeWhere } } ,
                ],
            },
            {
                deleted: false,
            },
        ],
    }

    const orderBy: ClimbingObjectOrder[] = parseSortAndOrderBy(normalizedParams.sort, normalizedParams.order);
    orderBy.push({ id: 'asc' });

    const climbingObjectListResult = await ClimbingObjectRepository.list(where, routeWhere, orderBy, normalizedParams.page, normalizedParams.pageSize);
    res.status(HTTP_STATUS.OK_200).json(climbingObjectListResult);
}

const create = async (req: Request<ClimbingObjectCreate>, res: Response) => {
    const climbingObjectData: ClimbingObjectCreate = req.body;

    const validatedData = requestValidator(() => climbingObjectCreateValidate(climbingObjectData), res);
    if (!validatedData) return;

    const climbingObject = await ClimbingObjectRepository.create(validatedData);
    res.status(HTTP_STATUS.CREATED_201).json(climbingObject);
}

const update = async (req: Request<{ id: string }, {}, ClimbingObjectUpdate>, res: Response) => {
    const climbingObjectData = req.body;
    const climbingObjectId = req.params.id

    const validatedData = requestValidator(() => climbingObjectUpdateValidate(climbingObjectData), res);
    if (!validatedData) return;

    const exists: boolean = await ClimbingObjectRepository.exists(climbingObjectId);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Climbing object not found" });
        return;
    }

    const climbingObject = await ClimbingObjectRepository.update(climbingObjectId, validatedData);
    res.status(HTTP_STATUS.OK_200).json(climbingObject);
}

const deleteById = async (req: Request, res: Response) => {
    const climbingObjectId = req.params.id;
    const exists: boolean = await ClimbingObjectRepository.exists(climbingObjectId);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Climbing object not found" });
        return;
    }

    await ClimbingObjectRepository.deleteById(climbingObjectId);
    res.status(HTTP_STATUS.NO_CONTENT_204).send();
}

export default {
    getById,
    create,
    update,
    deleteById,
    list,
};
