import { Router } from "express";
import { v1Router } from "./v1";

const mainRouter = Router();

// TODO use congfig
mainRouter.use("/api/v1", v1Router);

export { mainRouter };
