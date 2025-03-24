import { Prisma, PrismaClient } from "@prisma/client";
import { UserCreate, UserUpdate, UserList } from "../model/user";

const userClient = new PrismaClient().user;

type UserWhere = Prisma.UserWhereInput;
type UserOrder = Prisma.UserOrderByWithRelationInput;

const getUserById = async (id: string) => {
    return userClient.findUnique({
        where: { 
            id : id,
            deleted: false
        }
    });
}

const listUsers = async (where: UserWhere, orderBy: UserOrder[], pageNum : number, pageSize : number) : Promise<UserList> => {
    const users = await userClient.findMany({
        where,
        orderBy,
        skip: (pageNum - 1) * pageSize,
        take: pageSize,
      });
  
    const totalUsers = await userClient.count({ where });

    return {
        items: users,
        total: totalUsers,
        page: pageNum,
        pageSize: pageSize,
        totalPages: Math.ceil(totalUsers / pageSize),
    }
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
    getUserById, 
    listUsers,
    createUser, 
    updateUser, 
    deleteUser,
    exists,
};

export {
    UserWhere,
    UserOrder,
};
