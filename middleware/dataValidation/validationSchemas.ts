import { Request , Response , NextFunction } from "express";
import { z } from 'zod' ;

export const signupSchema = z.object({
    username : z.string().min(3).max(30) ,
    password : z.string().min(5).max(30) ,
    email : z.string().email(),
    phone : z.number().optional()
});

export const loginSchema = z.object({
    username : z.string() ,
    password : z.string()
});