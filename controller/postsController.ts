import posts from '../models/posts';
import { Request , Response } from 'express';
import { IPostData } from '../interfaces/dataBaseInterfaces';
import { title } from 'process';


export const getAllPosts = async(req : Request, res : Response) =>{

    const Allposts : IPostData[] = await posts.findAll();

    if(Allposts.length==0){
        res.status(204).json({message:"no posts yet !!!"}) ;
    }else{
        res.status(200).json({posts:Allposts}) ;
    }
}

export const createPost = async(req:any, res:Response)=>{
    const postData : IPostData = req.body ;
    postData.url = req.file ;
    const userId = req['userId'] ;
    try{
        if(!File){
            const savePost = await posts.create({
                title : postData.title,
                description : postData.description,
                content : postData.content,
                image_url : null,
                user_id : userId
            });
            res.status(201).json({message:"data saved successfully", post: savePost});
        }
        else{
            const savePost = await posts.create({
                title : postData.title,
                description : postData.description,
                content : postData.content,
                image_url : `/uploads/${postData.url.filename}`,
                user_id : userId
            });
            res.status(201).json({message:"data saved successfully", post: savePost});
        }
    }catch(err){
        res.status(400).json({message:"invalid data"});
    }

}

export const getSinglePost = async(req: Request, res: Response)=>{
    const postId = req.params.postId ;
    try{
        const fetchSinglePost = await posts.findByPk(postId);
        if(fetchSinglePost){
            res.status(200).json({message:"post fetched successfully", post: fetchSinglePost});
        }else{
            res.status(404).json({message:"couldn`t find this post ;D"}) ;
        }
        
    }catch(err){
        res.status(400).json({message:"error in fetching that post !!!"+err});
    }
}