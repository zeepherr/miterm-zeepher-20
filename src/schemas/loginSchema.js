import z from "zod";


export const loginSchema = z.object({
    username: z.string().min(3,"User name must be more than 3 char!"),
    password : z.string().min(3,"Password must be more than 4 char")
})