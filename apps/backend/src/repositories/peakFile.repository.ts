import { PrismaClient } from "@prisma/client";
import { PeakFile, peakFileSelector } from "../model/peakFile/index";
import { PeakFileCreate } from "../model/peakFile/peakFileCreate";
import { RefObject } from "../model/common/refObject";
import { toConnector } from "./utils/connector";

const peakFileClient = new PrismaClient().peakFile;

const getById = async (id: string) : Promise<PeakFile | null> => {
    return await peakFileClient.findUnique({
        where: { id },
        select: peakFileSelector,
    });
}

const deleteById = async (id: string) : Promise<void> => {
    await peakFileClient.delete({
        where: { id },
    });
}

const create = async (data: PeakFileCreate, userRef: RefObject) : Promise<PeakFile> => {
    return await peakFileClient.create({
        data: {
            ...data,
            createdAt: new Date(),
            createdBy: toConnector(userRef),
        },
        select: peakFileSelector,
    });
}

const exists = async (id: string) : Promise<boolean> => {
    const count = await peakFileClient.count({
        where: { id },
    });

    return count > 0;
}

export default { getById, deleteById, create, exists };
