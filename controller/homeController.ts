import { Request , Response } from "express";
import user from "../models/user";

export const home = async(req:any, res:Response) =>{

    const userId = req['userId'];
    console.log(userId);
    const getuser = await user.findByPk(userId);
    if(getuser){
        res.json({message:'user access granted !!!!!',username:getuser.username});
    }else{
        res.json({message:'user not found'});
    }
    

}