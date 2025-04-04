import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "./utils/httpStatusCodes";
import UserRepository from "../repositories/user.repository";
import { UserCreate, userCreateValidate } from "../model/user/index";

const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({
            error: "Username and password are required",
        });
        return;
    }

    const user = await UserRepository.validateUser(email, password);

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

const isUsernameUnique: RequestHandler = async (req, res) => {
    const { userName } = req.body;

    if (!userName) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({
            error: "Username is required",
        });
        return;
    }

    const userExists = await UserRepository.findByUsername(userName);

    if (userExists) {
        res.status(HTTP_STATUS.OK_200).json({
            unique: false,
            error: "Username is already taken",
        });
    } else {
        res.status(HTTP_STATUS.OK_200).json({
            unique: true,
            message: "Username is available",
        });
    }
};

const isEmailUnique: RequestHandler = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(HTTP_STATUS.BAD_REQUEST_400).json({
            error: "Email is required",
        });
        return;
    }

    const emailExists = await UserRepository.findByEmail(email as string);

    if (emailExists) {
        res.status(HTTP_STATUS.OK_200).json({
            unique: false,
            error: "Email is already in use",
        });
    } else {
        res.status(HTTP_STATUS.OK_200).json({
            unique: true,
            message: "Email is available",
        });
    }
};

export default {
    login,
    register,
    isUsernameUnique,
    isEmailUnique,
};
