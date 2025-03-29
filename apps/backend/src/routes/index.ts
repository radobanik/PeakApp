import { Router } from "express";
import { v1Router } from "./v1";
import config from "../core/config";

const mainRouter = Router();

const apiPrefix = config.apiPrefix;
mainRouter.use(`${apiPrefix}/v1`, v1Router);

export { mainRouter };
