import { Router } from "express";
import { ActivityController } from "../../controllers";

const activityRouter = Router();

activityRouter.get("/", ActivityController.getAllUnassigned);
activityRouter.get("/:id", ActivityController.getById);
activityRouter.post("/", ActivityController.create);
activityRouter.put("/:id", ActivityController.update);
activityRouter.delete("/:id", ActivityController.deleteById);

export default activityRouter;
