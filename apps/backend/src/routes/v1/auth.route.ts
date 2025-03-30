import { Router } from "express";
import { AuthController } from "../../controllers/index";

const authRouter = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token returned
 */
authRouter.post("/login", AuthController.login);

export default authRouter;
