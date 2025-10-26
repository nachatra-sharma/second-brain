import z from 'zod'

export const LoginSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long').max(20, 'Password must be at most 20 characters long'),
})


export const SignupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long').max(20, 'Password must be at most 20 characters long'),
    email: z.email('Invalid email address'),
})
