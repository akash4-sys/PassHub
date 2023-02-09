import express, { Request, Response, NextFunction } from "express";
import { NotAuthorizedErr } from "../errors/notAuthorizedErr";

const requireAuth = (req: Request, res: Response, next:NextFunction) => {
    if (!req.currentUser) {
        throw new NotAuthorizedErr();
    }
    next();
}

export default requireAuth;