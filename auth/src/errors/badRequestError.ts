import { CustomError } from './customError';

export class BadRequestError extends CustomError {
    statusCode = 400;
    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
};


// @ without public keyword
// export class BadRequestError extends CustomError {
//     message = "";
//     constructor(message: string) {
//         super(message);
//         this.message = message;
//     }

//     serializeErrors() {
//         return [{ message: this.message }];
//     }
// };