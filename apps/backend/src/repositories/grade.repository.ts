import { PrismaClient } from "@prisma/client";
import { GradeCreate, GradeDetail, gradeDetailSelector, GradeList, gradeListSelector } from "../model/grade";

const gradeClient  = new PrismaClient().grade;

const getAll = async () : Promise<GradeList[]> => {
    return await gradeClient.findMany({
        where: {
            deleted: false,
        },
        orderBy: {
            rating: "asc",
        },
        select: gradeListSelector
    });
}

const create = async (grade: GradeCreate) : Promise<GradeDetail> => {
    return await gradeClient.create({
        data: grade,
        select: gradeDetailSelector,
    });
}

const update = async (id: string, grade: GradeCreate) : Promise<GradeDetail> => {
    return await gradeClient.update({
        where: { id },
        data: grade,
        select: gradeDetailSelector,
    });
}

const deleteById = async (id: string) => {
    await gradeClient.update({
        where: { id },
        data: {
            deleted: true,
        },
        select: {
            id: true,
        },
    });
}

const exists = async (id: string) : Promise<boolean> => {
    const count = await gradeClient.count({
        where: {
            id : id,
            deleted: false
        }
    });
    return count > 0;
}

export default {
    getAll,
    create,
    update,
    deleteById,
    exists,
};