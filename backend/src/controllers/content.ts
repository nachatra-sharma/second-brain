import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ContentSchema, UpdateContentSchema } from "../validations/content.js";
import z from 'zod';
import contentModel from "../model/content.js";

export const handleGetContent = async (req: Request, res: Response) => {
    try {
        const result = await contentModel.find({}).populate('user_id', ['_id', 'email', 'password']);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Content Successfully Fetched',
            data: {
                result
            },
            error: {}
        })
    } catch (error) {
        console.log("Error occured in handleGetContent Route", error)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Bad Request',
            data: {},
            error: {
                error
            }
        })
    }
}

export const handleCreateContent = async (req:Request, res:Response) => {
    try {
        const {title, link, tags} = req.body;
        const isValidSchema = ContentSchema.safeParse({title, link, tags})
        if(!isValidSchema.success){
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Bad Request',
                data: {},
                error: z.treeifyError(isValidSchema.error)
            })
        }
        const user = req.user
        const createContent = await contentModel.create({
            title,
            link,
            tags,
            user_id: user?.id
        })

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Successfully added new information to your second brain.',
            data: {
                createContent
            },
            error: {}
        })
    } catch (error) {
        console.log("Error occured in handleCreateContent Route", error)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Bad Request',
            data: {},
            error: {
                error
            }
        })
    }
}

export const handleGetContentById = async (req:Request, res: Response) => {
    try {
        const id = req.params.id;
        if(!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid ID",
                data: {},
                error: {}
            })
        }
        const result = await contentModel.findById({
            _id: id
        }).populate('user_id', ['_id', 'email', 'username'])
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Fetched Successfully",
            data: {result},
            error: {}
        })
    } catch (error) {
        console.log("Error occured in handleCreateContent Route", error)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Bad Request',
            data: {},
            error: {
                error
            }
        })
    }
}

export const handleDeleteContentById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
         if(!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid ID",
                data: {},
                error: {}
            })
        }
        const result = await contentModel.deleteOne({
            _id: id
        }).populate('user_id', ['_id', 'email', 'password']);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content deleted successfully",
            data: {result},
            error: {}
        })
    } catch (error) {
        console.log("Error occured in handleCreateContent Route", error)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Bad Request',
            data: {},
            error: {
                error
            }
        })
    }
}

export const handleUpdateContentById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const {title, link, tags} = req.body;
        const isValidSchema = UpdateContentSchema.safeParse({title, link, tags})
        if(!isValidSchema.success) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid Schema",
                data: {},
                error: z.treeifyError(isValidSchema.error)
            })
        }
         if(!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Invalid ID",
                data: {},
                error: {}
            })
        }
        const result = await contentModel.findByIdAndUpdate(id, {title, link, tags}, {new: true}).populate('user_id', ['username', 'email', 'id']);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Content updated successfully",
            data: {result},
            error: {}
        })
    } catch (error) {
        console.log("Error occured in handleCreateContent Route", error)
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Bad Request',
            data: {},
            error: {
                error
            }
        })
    }
}
