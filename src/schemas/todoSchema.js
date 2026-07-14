import z from "zod";

export const todoSche = z.object({
    content :z.string().min(1,"Please Enter a name to add!")
})