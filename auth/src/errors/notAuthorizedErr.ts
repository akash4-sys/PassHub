import { CustomError } from "./customError";

export class NotAuthorizedErr extends CustomError {
    statusCode = 401;
    constructor() {
        super("You are not authorized");
        Object.setPrototypeOf(this, NotAuthorizedErr.prototype);
    }
    
    serializeErrors() {
        return  [{ message: "You are not authorized" }];
    }
}