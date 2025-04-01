import { Router } from "express";
import { PeakFileController } from "../../controllers/index";

const peakFileRouter = Router();

peakFileRouter.get("/:id", PeakFileController.getById);
peakFileRouter.post("/", PeakFileController.create);
peakFileRouter.delete("/:id", PeakFileController.deleteById);

export default peakFileRouter;
