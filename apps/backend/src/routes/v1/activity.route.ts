import { Router } from "express";
import { ActivityController } from "../../controllers";
import passport from "passport";

const activityRouter = Router();

activityRouter.get("/", passport.authenticate("jwt", {session: false}), ActivityController.getAllUnassigned);
activityRouter.get("/:id", passport.authenticate("jwt", {session: false}), ActivityController.getById);
activityRouter.post("/", passport.authenticate("jwt", {session: false}), ActivityController.create);
activityRouter.put("/:id", passport.authenticate("jwt", {session: false}), ActivityController.update);
activityRouter.delete("/:id", passport.authenticate("jwt", {session: false}), ActivityController.deleteById);

export default activityRouter;
