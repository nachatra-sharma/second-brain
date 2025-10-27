import type { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function CheckUserId (user_id: string, res: Response) {
    if(!user_id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Unauthorized',
            data: {},
            error: {}
        })
    }
}
