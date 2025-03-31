import { Router } from "express";
import { UserController } from "../../controllers/index";
import checkRoles from "../../middlewares/checkRoles";
import checkAdminOrOwner from "../../middlewares/checkAdminOrOwner";
import passport from "passport";
import { Role } from "@prisma/client";


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
userRouter.get("/",
    passport.authenticate("jwt", { session: false }),
    checkRoles([Role.ADMIN]),
    UserController.getUserById
);

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
userRouter.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    checkAdminOrOwner(),
    UserController.getUserById
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     responses:
 *       201:
 *         description: User created
 */
userRouter.post("/",
    passport.authenticate("jwt", { session: false }),
    checkRoles([Role.ADMIN]),
    UserController.getUserById
);

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
userRouter.put("/:id",
    passport.authenticate("jwt", { session: false }),
    checkAdminOrOwner(),
    UserController.getUserById
);

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
userRouter.delete("/:id",
    passport.authenticate("jwt", { session: false }),
    checkRoles([Role.ADMIN]),
    UserController.getUserById
);

export default userRouter;
