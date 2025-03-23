import { Request, Response } from "express";
import { HTTP_STATUS } from "./utils/httpStatusCodes";
import UserRepository from "../repositories/user.repository";
import { User, UserCreate, UserUpdate, validateUserCreate, validateUserUpdate } from "../model/user";

const getAllUsers = async (req: Request, res: Response) => {
    const allUsers = await UserRepository.getAllUsers();
    res.status(HTTP_STATUS.OK_200).json({ data: allUsers });
}

const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await UserRepository.getUserById(userId);

    if (user == null) {
        res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "User not found" });
    } else {
        res.status(HTTP_STATUS.OK_200).json({ data: user });
    }
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
    res.status(HTTP_STATUS.CREATED_201).json({ data: user });
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
    res.status(HTTP_STATUS.OK_200).json({ data: user });
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
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
};
