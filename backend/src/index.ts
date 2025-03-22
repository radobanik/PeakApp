import { Request, Response } from 'express';
import app from './app'

/**
 * Port config
*/
// TODO config
const port = 8080;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

/**
 * Random shit
 */
app.get("/", (req: Request, res: Response) => {
    res.send("HELO!11!!!!");
})