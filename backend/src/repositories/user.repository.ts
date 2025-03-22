import { PrismaClient } from "@prisma/client";

const userClient = new PrismaClient().user;

const getAllUsers = async () => {
    return userClient.findMany();
}

const getUserById = async (id: string) => {
    return userClient.findUnique({
        where: { id }
    });
}

const createUser = async (userData: any) => {
    return userClient.create({
        data: userData
    });
}

const updateUser = async (id: string, userData: any) => {
    userData.id = id; // to not overwrite id
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

export default { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
};
