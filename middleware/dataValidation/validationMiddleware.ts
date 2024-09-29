import { Request,Response,NextFunction } from "express";
import {z,ZodError} from 'zod' ;

export const validateUserInput = (Schema:z.ZodSchema<any>)=>{
    return (req :Request, res :Response , next :NextFunction)=>{
        try{
            Schema.parse(req.body) ;
            next();
        }catch(err){
            if (err instanceof ZodError) {
                return res.status(400).json({ error: err.errors });
              }
              next(err);
        }
    }
}