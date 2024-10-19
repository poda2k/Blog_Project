import { Request,Response } from "express";
import categories from "../models/categories";

export async function createCat(req : Request &{userId?:string},res : Response):Promise<void>{
    interface catData {
        name: string;
        userId:number;
    }
    const categoriesArray:catData[] = req.body.name;
    try{
        // const createRecord = await categories.create({
        //     name : catName,
        //     userId : req['userId']
        // });
       const insertedData =  await categoriesArray.map((catName : catData) => ({
            name: catName.name,
            userId: req.userId
        }));
        const createRecord = await categories.bulkCreate(insertedData ,{
            ignoreDuplicates: true ,
        });
        res.json({message:"category created successfully" , category:createRecord});
    }catch(err){
        res.json({message:"failed to create category" , error : err});
    }

}

export const getAllCat = async(req:Request, res:Response) => {
    try{
        const allCategories = await categories.findAll() ;

        console.log(allCategories.length);
        if(allCategories.length>0){
            res.status(200).json({categories : allCategories});
        }else{
            res.status(200).json({message: "no categories yet !!"}) ;
        }
    }catch(err){
        res.json({message: "failed to get categories" , error : err}) ;
    }
}