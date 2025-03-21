import express , {Express, Request, Response} from 'express';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : undefined;

if (port === undefined) {
  throw new Error("PORT is not defined in the .env file");
}

app.use(express.json());

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

app.get("/", (req: Request, res: Response) => {
    res.send("HELO!11!!!!");
})