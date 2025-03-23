import { PrismaClient } from "@prisma/client";
import { UserCreate, UserUpdate } from "../model/user";

const userClient = new PrismaClient().user;

const getAllUsers = async () => {
    return userClient.findMany();
}

const getUserById = async (id: string) => {
    return userClient.findUnique({
        where: { 
            id : id,
            deleted: false
        }
    });
}

const createUser = async (userData: UserCreate) => {
    return userClient.create({
        data: userData
    });
}

const updateUser = async (id: string, userData: UserUpdate) => {
    return userClient.update({
        where: { id },
        data: {
            ...userData,
            updated: new Date(),
        }
    });
}

const deleteUser = async (id: string) => {
    return userClient.update({
        where: { id },
        data: {
            deleted: true,
            updated: new Date(),
        }
    });
}

const exists = async (id: string) => {
    const count =  await userClient.count({
        where: { 
            id : id,
            deleted: false
        }
    });
    return count > 0;
}

export default { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser,
    exists
};
