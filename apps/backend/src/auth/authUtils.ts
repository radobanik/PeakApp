import { Request } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/user.repository";
import { UserDetail } from "../model/user/userDetail";

export const provideUserDetailFromToken = async (request: Request): Promise<UserDetail | null> => {
  	const authHeader = request.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return null;
	}

	const token = authHeader.split(" ")[1];

	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret") as { id: string };
		const user = await userRepository.getUserById(decodedToken.id);
		return user || null;
	} catch (err) {
		return null;
	}
};
