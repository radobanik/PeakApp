import { PrismaClient } from "@prisma/client";
import { UserCreate, UserUpdate } from "../model/user";

const userClient = new PrismaClient().user;

const getAllUsers = async () => {
    return userClient.findMany();
}

const getUserById = async (id: string) => {
    return userClient.findUnique({
        where: { id }
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
        data: userData
    });
}

const deleteUser = async (id: string) => {
    return userClient.delete({
        where: { id }
    });
}

const exists = async (id: string) => {
    const count =  await userClient.count({
        where: { id }
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
