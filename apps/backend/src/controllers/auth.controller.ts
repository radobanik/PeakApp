import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "./utils/httpStatusCodes";
import UserRepository from "../repositories/user.repository";
import { UserCreate, userCreateValidate } from "../model/user/index";

const login: RequestHandler = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({
            error: "Username and password are required",
        });
        return;
    }

    const user = await UserRepository.validateUser(username, password);

    if (!user) {
        res.status(HTTP_STATUS.UNAUTHORIZED_401).json({
            error: "Invalid username or password",
        });
        return;
    }

    const token = jwt.sign(
        { id: user.id, username: user.userName, roles: user.roles },
        process.env.JWT_SECRET || "defaultsecret",
        { expiresIn: "1h" }
    );

    res.status(HTTP_STATUS.OK_200).json({
        message: "Login successful",
        token,
        user,
    });
};

const register: RequestHandler = async (req, res) => {
    const userData: UserCreate = req.body;

    const validationResult = userCreateValidate(userData);
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

    try {
        const user = await UserRepository.createUser(validationResult.data);
        res.status(HTTP_STATUS.CREATED_201).json(user);
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({
            error: "Failed to register user",
        });
    }
};

export default {
    login,
    register,
};
