import { Request, Response } from "express";
import { HTTP_STATUS } from "./utils/httpStatusCodes";
import UserRepository, { UserOrder, UserWhere } from "../repositories/user.repository";
import { User, UserCreate, UserUpdate, validateUserCreate, validateUserUpdate, validSortFields } from "../model/user";
import config from "../core/config";

const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await UserRepository.getUserById(userId);

    if (user == null) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "User not found" });
    } else {
        res.status(HTTP_STATUS.OK_200).json(user);
    }
}

const userList = async (req: Request, res: Response) => {
    const { 
        firstName = '', lastName = '', email = '',
        sort, order = 'asc',
        page = '1', pageSize = '10'
    } = req.query;

    const pageNum = parseInt(page as string);
    const size = Math.min(parseInt(pageSize as string), config.listLimit.user);

    const where: UserWhere = {
        AND: [
          {
            AND: [
              { firstName: { contains: firstName as string, mode: "insensitive" } },
              { lastName: { contains: lastName as string, mode: "insensitive" } },
              { email: { contains: email as string, mode: "insensitive" } },
            ],
          },
          {
            deleted: false,
          },
        ],
      };

    const sortFields = (sort as string)?.split(',') || [];
    const orderFields = (order as string)?.split(',') || [];

    const orderBy: UserOrder[] = sortFields
    .map((field, index) => {
      if (validSortFields.includes(field)) {
        return { [field]: orderFields[index] === 'desc' ? 'desc' : 'asc' } as UserOrder;
      }
      return null;
    })
    .filter((order): order is UserOrder => order !== null);

    // Default sort if none provided
    if (orderBy.length === 0) orderBy.push({ id: 'asc' });

    const userListResult = await UserRepository.listUsers(where, orderBy, pageNum, size);
    res.status(HTTP_STATUS.OK_200).json(userListResult);
}

const createUser = async (req: Request<UserCreate>, res: Response) => {
    const userData: UserCreate = req.body;
        
    // TODO extract this validation to utility
    const validationResult = validateUserCreate(userData);
    if (validationResult.error) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({
            error: "Invalid user data",
            details: validationResult.error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
        });
        return;
    }

    const user = await UserRepository.createUser(validationResult.data);
    res.status(HTTP_STATUS.CREATED_201).json(user);
}

const updateUser = async (req: Request<{ id: string }, {},  UserUpdate>, res: Response) => {
    const userData = req.body;
    const userId = req.params.id

    // TODO extract this validation to utility
    const validationResult = validateUserUpdate(userData);
    if (validationResult.error) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({
            error: "Invalid user data",
            details: validationResult.error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            })),
        });
        return;
    }

    const updateValues : UserUpdate = validationResult.data;
    const inMemoryUser : User | null = await UserRepository.getUserById(userId);
    if (inMemoryUser == null) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "User not found" });
        return;
    }
    
    const updatedUser: User = {
        ...inMemoryUser,
        ...updateValues,
    };

    const user = await UserRepository.updateUser(userId, updatedUser);
    res.status(HTTP_STATUS.OK_200).json(user);
}

const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const exists = await UserRepository.exists(userId);
    if (!exists) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "User not found" });
        return;
    }

    await UserRepository.deleteUser(userId);
    res.status(HTTP_STATUS.NO_CONTENT_204).send();
}

export default { 
    getUserById, 
    userList,
    createUser, 
    updateUser, 
    deleteUser 
};
