import e, { Request, Response } from "express";
import { GradeRepository } from "../repositories";
import { HTTP_STATUS } from "./utils/httpStatusCodes";
import { gradeCreateValidate, GradeUpdate } from "../model/grade";
import requestValidator from "../model/common/validator";

const getAll = async (req : Request, res : Response) => {
    const grades = await GradeRepository.getAll();
    res.status(HTTP_STATUS.OK_200).json(grades);
}

const create = async (req : Request, res : Response) => {
    const grade = req.body;
    const validatedData = requestValidator(() => gradeCreateValidate(grade), res);
    if (!validatedData) return;

    const createdGrade = await GradeRepository.create(validatedData);
    res.status(HTTP_STATUS.CREATED_201).json(createdGrade);
}

const update = async (req : Request<{ id: string }, {}, GradeUpdate>, res : Response) => {
    const grade = req.body;
    const gradeId = req.params.id;
    const validatedData = requestValidator(() => gradeCreateValidate(grade), res);
    if (!validatedData) return;

    const exists = await GradeRepository.exists(gradeId);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Grade not found" });
        return;
    }

    const updatedGrade = await GradeRepository.update(gradeId, validatedData);
    res.status(HTTP_STATUS.OK_200).json(updatedGrade);
}

const deleteById = async (req : Request, res : Response) => {
    const gradeId = req.params.id;
    const exists = await GradeRepository.exists(gradeId);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "Grade not found" });
        return;
    }

    await GradeRepository.deleteById(gradeId);
    res.status(HTTP_STATUS.NO_CONTENT_204).send();
}

export default {
    getAll,
    create,
    update,
    deleteById,
};
