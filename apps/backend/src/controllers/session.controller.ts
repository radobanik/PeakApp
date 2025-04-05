import e, { Request, Response } from "express";
import { SessionRepository } from "../repositories";
import { HTTP_STATUS } from "./utils/httpStatusCodes";
import { ActivityCreate, activityCreateValidate, activityUpdateValidate } from "../model/activity";
import requestValidator from "../model/common/validator";
import { ActivityUpdate } from "../model/activity/activityUpdate";
import { provideUserRefFromToken, returnUnauthorized } from "../auth/authUtils";
import { IncommingListParams, NonNullListParams, toNotNullListParams } from "../model/common/listParams";
import config from "../core/config";
import { SessionCreate, sessionCreateValidate, SessionUpdate, sessionUpdateValidate } from "../model/session";



const list = async (req : Request, res : Response) => {
    const params = req.query as unknown as IncommingListParams;
    const normalizedParams: NonNullListParams = toNotNullListParams(params, config.listLimit.default);
    const requestUser = provideUserRefFromToken(req);
    if (requestUser === null) {
        res.status(HTTP_STATUS.UNAUTHORIZED_401);
        return;
    }

    const routeListResult = await SessionRepository.list(requestUser, normalizedParams.page, normalizedParams.pageSize);
    res.status(HTTP_STATUS.OK_200).json(routeListResult);
}

const getById = async (req : Request, res : Response) => {
    const sessionId = req.params.id;
    const requestUser = provideUserRefFromToken(req);
    if (requestUser === null) {
        res.status(HTTP_STATUS.UNAUTHORIZED_401);
        return;
    }

    const session = await SessionRepository.getById(requestUser, sessionId);
    if (session == null) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Session not found" });
    } else {
        res.status(HTTP_STATUS.OK_200).json(session);
    }
}

const create = async (req : Request, res : Response) => {
    const userRef = provideUserRefFromToken(req as unknown as Request)
    if (userRef === null) { returnUnauthorized(res); return; }
    
    const session: SessionCreate = req.body;
    const validatedData = requestValidator(() => sessionCreateValidate(session), res);
    if (!validatedData) return;

    const createdSession = await SessionRepository.create(validatedData, userRef);
    res.status(HTTP_STATUS.CREATED_201).json(createdSession);
}

const update = async (req : Request<{ id: string }, {}, SessionUpdate>, res : Response) => {
    const session = req.body;
    const sessionId = req.params.id;
    const validatedData = requestValidator(() => sessionUpdateValidate(session), res);
    if (!validatedData) return;

    const exists = await SessionRepository.update(sessionId, validatedData);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Session not found" });
        return;
    }

    const updatedActivity = await SessionRepository.update(sessionId, validatedData);
    res.status(HTTP_STATUS.OK_200).json(updatedActivity);
}

const deleteById = async (req : Request, res : Response) => {
    const sessionId = req.params.id;
    const exists = await SessionRepository.exists(sessionId);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Session not found" });
        return;
    }

    await SessionRepository.deleteById(sessionId);
    res.status(HTTP_STATUS.NO_CONTENT_204).send();
}

export default {
    getAll: list,
    getById,
    create,
    update,
    deleteById,
};
