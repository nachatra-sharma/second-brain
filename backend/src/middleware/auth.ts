import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config/index.js";

declare global {
    namespace Express {
        interface Request {
            user?: string | jwt.JwtPayload;
        }
    }
}

export const checkAuthenticatedUser = (req: Request, res:Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Invalid Token",
                data: {},
                error: {},
            })
        }

        const token = authorizationHeader.split(' ')[1]?.trim() as string
        const decoded = jwt.verify(token, JWT_SECRET as string) as jwt.JwtPayload;
        req.user = decoded
        next();
    } catch (error) {
        console.log("Error occured inside middleware", error)
        return res.status(StatusCodes.UNAUTHORIZED).json({
             success: false,
             message: "Invalid Token",
             data: {},
             error: {},
        })
    }
}
