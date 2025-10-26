import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const handleGetContent = (req: Request, res: Response) => {
    try {
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Content Successfully Fetched',
            data: {},
            error: {}
        })
    } catch (error) {
        console.log("Error occured in handleGetContent Route", error)
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Content Successfully Fetched',
            data: {},
            error: {}
        })
    }
}
