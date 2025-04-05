import { Router } from "express";
import { SessionController } from "../../controllers";

const sessionRouter = Router();

sessionRouter.get("/", SessionController.getAll);
sessionRouter.get("/:id", SessionController.getById);
sessionRouter.post("/", SessionController.create);
sessionRouter.put("/:id", SessionController.update);
sessionRouter.delete("/:id", SessionController.deleteById);

export default sessionRouter;
