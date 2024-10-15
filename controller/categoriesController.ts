import { Request, Response } from "express";

export async function createCat(req : Request,res : Response):Promise<void>{
    
    res.json({message:req.body});
}