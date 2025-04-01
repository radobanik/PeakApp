import { USER_CHRIS_BROWN_ID } from "../init/user.init";
import { RefObject } from "../model/common/refObject";
import { Request } from "express";

// TODO this is a mock implementation, replace with actual implementation
// replace RefObject by actual JWT user (must contain at least id)
const provide = (/*request : Request*/) : RefObject => {
    return {
        id: USER_CHRIS_BROWN_ID,
    };
}

export default provide;
