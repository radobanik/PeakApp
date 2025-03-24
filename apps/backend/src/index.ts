import { Request, Response } from 'express';
import app from './app'
import config from './core/config';

/**
 * Port config
*/
app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`);
})

/**
 * Random shit
 */
app.get("/", (req: Request, res: Response) => {
    res.send("HELO!11!!!!");
})