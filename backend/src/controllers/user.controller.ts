import { Request, Response } from "express";
import { HTTP_STATUS } from "../utils/httpStatusCodes";
import UserRepository from "../repositories/user.repository";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await UserRepository.getAllUsers();
        res.status(HTTP_STATUS.OK_200).json({ data: allUsers });
    } catch (e) {
        console.log(e);
    }
}

const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await UserRepository.getUserById(userId);

        if (user == null) {
            res.status(HTTP_STATUS.NOT_FOUND_404).json({ error: "User not found" });
        } else {
            res.status(HTTP_STATUS.OK_200).json({ data: user });
        }
    } catch (e) {
        console.log(e);
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const user = await UserRepository.createUser(userData);
        res.status(HTTP_STATUS.CREATED_201).json({ data: user });
    } catch (e) {
        console.log(e);
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const userId = req.params.id;
        const user = await UserRepository.updateUser(userId, userData);
        res.status(HTTP_STATUS.OK_200).json({ data: user });
    } catch (e) {
        console.log(e);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        await UserRepository.deleteUser(userId);
        res.status(HTTP_STATUS.NO_CONTENT_204).send();
    } catch (e) {
        console.log(e);
    }
}

export default { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser 
};
