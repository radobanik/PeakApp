import { Router } from "express";
import userRouter from "./user.route";
import authRouter from "./auth.route";
import peakFileRouter from "./peakFile.route";
import gradeRouter from "./grade.route";

const v1Router = Router();

const routes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/file',
        route: peakFileRouter
    },
    {
        path: '/grade',
        route: gradeRouter
    },
];

routes.forEach((route) => {
    v1Router.use(route.path, route.route)
})

export { v1Router };
