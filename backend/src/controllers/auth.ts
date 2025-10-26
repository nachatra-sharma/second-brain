import type { Request, Response } from 'express';
import status from 'http-status-codes';
import { LoginSchema, SignupSchema } from '../validations/auth.js';
import z from 'zod';
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/index.js';

export const handleLogin = async (req:Request, res: Response) => {
    try {
    const {username, password} = req.body;
    const isValidationPassed = LoginSchema.safeParse({username, password});
    if(!isValidationPassed.success) {
        return res.status(status.StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'Validation Failed',
            data: {},
            error: z.treeifyError(isValidationPassed.error)
        })
    }

    const user = await User.findOne({username})

    if(!user) {
        return res.status(status.StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid username or password',
            data: {},
            error: {}
        })
    }

    const isComparedPasswordMatched =  await bcrypt.compare(password, user.password);

    if(!isComparedPasswordMatched) {
        return res.status(status.StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Invalid username or password',
            data: {},
            error: {}
        })
    }

    const token = jwt.sign({id: user._id, username: user.username}, JWT_SECRET as string)

    return res.status(status.StatusCodes.CREATED).json({
        success: true,
        message: 'Login successful',
        data: {
            token
        },
        error: {}
    })
    } catch (error) {
        console.log('Error in handleLogin:', error);
        return res.status(status.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error',
            data: {},
            error: {}
        })
    }
}


export const handleSignup = async (req:Request, res: Response) => {
    try {
        const {username, password, email} = req.body;
        const isValidationPassed = SignupSchema.safeParse({username, password, email});
        if(!isValidationPassed.success) {
            return res.status(status.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: 'Validation Failed',
                data: {},
                error: z.treeifyError(isValidationPassed.error)
            })
        }

        const isUserAlreadyExists = await User.findOne({
            $or: [{username}, {email}]
        })

        if(isUserAlreadyExists) {
            return res.status(status.StatusCodes.CONFLICT).json({
                success: false,
                message: 'User already exists',
                data: {},
                error: {}
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
        })
        return res.status(status.StatusCodes.CREATED).json({
            success: true,
            message: 'User created successfully',
            data: {
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
            error: {}
        })
    } catch (error) {
        console.log('Error in handleSignup:', error);
        return res.status(status.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Internal Server Error',
            data: {},
            error: {}
        })
    }
}
