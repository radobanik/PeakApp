import { Router } from "express";
import userRouter from "./user.route";

const v1Router = Router();

const routes = [
    {
        path: '/user',
        route: userRouter
    },
];

routes.forEach((route) => {
    v1Router.use(route.path, route.route)
})

export { v1Router };
