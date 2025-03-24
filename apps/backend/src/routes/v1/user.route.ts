import { Router } from "express";
import { UserController } from "../../controllers/index";

const userRouter = Router();

userRouter.get("/", UserController.userList);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/", UserController.createUser);
userRouter.put("/:id", UserController.updateUser);
userRouter.delete("/:id", UserController.deleteUser);

export default userRouter;