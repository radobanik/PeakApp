import { Router } from 'express'
import { AuthController } from '../../controllers/index'

const authRouter = Router()

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
authRouter.post('/login', AuthController.login)

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
authRouter.post('/register', AuthController.register)

/**
 * @swagger
 * /auth/is-username-unique:
 *   post:
 *     summary: Check if a username is unique
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         unique: true/false,
 *         description: Username is available/already in use
 */
authRouter.post('/is-username-unique', AuthController.isUsernameUnique)

/**
 * @swagger
 * /auth/is-email-unique:
 *   post:
 *     summary: Check if an email is unique
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         unique: true/false,
 *         description: Email is available/already in use
 */
authRouter.post('/is-email-unique', AuthController.isEmailUnique)

export default authRouter
