import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "./utils/httpStatusCodes";
import UserRepository from "../repositories/user.repository";

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
        { id: user.id, username: user.userName },
        process.env.JWT_SECRET || "defaultsecret",
        { expiresIn: "1h" }
    );

    res.status(HTTP_STATUS.OK_200).json({
        message: "Login successful",
        token,
        user,
    });
};

export default {
    login
};
