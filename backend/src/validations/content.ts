import z from 'zod';

export const ContentSchema = z.object({
    title: z.string().min(3, 'Title must be atleast 3 character').max(100, 'Title must be smaller than 100 character'),
    link: z.url(),
    tags: z.array(z.string()).optional(),
})

export const UpdateContentSchema = z.object({
    title: z.string().min(3, 'Title must be atleast 3 character').max(100, 'Title must be smaller than 100 character').optional(),
    link: z.url().optional(),
    tags: z.array(z.string()).optional(),
})
