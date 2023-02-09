import express, { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string
    email: string,
}

// @ Accessing a existing type definition and modifiying(extending) it
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch (e) {}
    next();
};

export default currentUser;