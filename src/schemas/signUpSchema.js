import z from "zod";


export const loginSchema = z.object({
    username: z.string().min(3,"User name must be more than 3 char!"),
    password : z.string().min(3,"Password must be more than 4 char"),
     confirmPassword: z.string().min(1, "Please Enter same password"),
}).refine((data)=>data.confirmPassword === data.password,{
    message:"Passwords are not the same!",
    path:[confirmPassword]
})