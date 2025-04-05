import e, { Request, Response } from "express";
import { ActivityRepository } from "../repositories";
import { HTTP_STATUS } from "./utils/httpStatusCodes";
import { activityCreateValidate } from "../model/activity";
import requestValidator from "../model/common/validator";
import { ActivityUpdate } from "../model/activity/activityUpdate";
import { provideUserRefFromToken, returnUnauthorized } from "../auth/authUtils";
import { IncommingListParams, NonNullListParams, toNotNullListParams } from "../model/common/listParams";
import config from "../core/config";

const getAllUnassigned = async (req : Request, res : Response) => {
    const params = req.query as unknown as IncommingListParams;
    const normalizedParams: NonNullListParams = toNotNullListParams(params, config.listLimit.default);
    const activities = await ActivityRepository.list(normalizedParams.page, normalizedParams.pageSize); // Replace null with appropriate arguments
    res.status(HTTP_STATUS.OK_200).json(activities);
}

const getById = async (req : Request, res : Response) => {
    const activityId = req.params.id;
    const activity = await ActivityRepository.getById(activityId);
    if (activity == null) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Activity not found" });
    } else {
        res.status(HTTP_STATUS.OK_200).json(activity);
    }
}

const create = async (req : Request, res : Response) => {
    const userRef = provideUserRefFromToken(req as unknown as Request)
    if (userRef === null) { returnUnauthorized(res); return; }
    
    const activity = req.body;
    const validatedData = requestValidator(() => activityCreateValidate(activity), res);
    if (!validatedData) return;

    const createdActivity = await ActivityRepository.create(validatedData, userRef);
    res.status(HTTP_STATUS.CREATED_201).json(createdActivity);
}

const update = async (req : Request<{ id: string }, {}, ActivityUpdate>, res : Response) => {
    const activity = req.body;
    const activityId = req.params.id;
    const validatedData = requestValidator(() => activityCreateValidate(activity), res);
    if (!validatedData) return;

    const exists = await ActivityRepository.(activityId);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Activity not found" });
        return;
    }

    const updatedActivity = await ActivityRepository.update(activityId, validatedData);
    res.status(HTTP_STATUS.OK_200).json(updatedActivity);
}

const deleteById = async (req : Request, res : Response) => {
    const activityId = req.params.id;
    const exists = await ActivityRepository.exists(activityId);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Activity not found" });
        return;
    }

    await ActivityRepository.deleteById(activityId);
    res.status(HTTP_STATUS.NO_CONTENT_204).send();
}

export default {
    getAllUnassigned,
    getById,
    create,
    update,
    deleteById,
};
