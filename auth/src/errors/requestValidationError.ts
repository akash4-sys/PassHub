import { ValidationError } from 'express-validator';
import { CustomError } from "./customError";

// @ This method can be used to keep our CustomErrors consistent by defining the interface ts
// @ This needs to be done for every class and there will be a lot of if conditions in errorHandler
// interface CustomError {
//     statusCode: number;
//     serializeErrors(): {            // array of objects
//         message: string;
//         field?: string;
//     }[];
// }
// export class RequestValidationError extends Error implements CustomError

export class RequestValidationError extends CustomError {
    statusCode = 400;
    errors: ValidationError[];
    constructor(errors: ValidationError[]) {
        super("Invalid request parameters");
        this.errors = errors;

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error => {
            return { message: error.msg, field: error.param }
        });
    };
};