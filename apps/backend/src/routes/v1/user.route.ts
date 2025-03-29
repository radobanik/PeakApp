import { Router } from "express";
import { UserController } from "../../controllers/index";

const userRouter = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
userRouter.get("/", UserController.userList);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: User found
 */
userRouter.get("/:id", UserController.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: User created
 */
userRouter.post("/", UserController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: User updated
 */
userRouter.put("/:id", UserController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: User deleted
 */
userRouter.delete("/:id", UserController.deleteUser);

export default userRouter;
