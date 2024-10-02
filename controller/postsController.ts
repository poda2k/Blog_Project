import posts from '../models/posts';
import { Request , Response } from 'express';
import { IPostData } from '../interfaces/dataBaseInterfaces';
import { title } from 'process';


export const getAllPosts = async(req : Request, res : Response) =>{

    const Allposts : IPostData[] = await posts.findAll();

    if(Allposts.length==0){
        res.json({message:"no posts yet !!!"}) ;
    }else{
        res.json({posts:Allposts}) ;
    }
}

export const createPost = async(req:any, res:Response)=>{
    const postData : IPostData = req.body ;
    postData.url = req.file ;
    const userId = req['userId'] ;
    const savePost = await posts.create({
        title : postData.title,
        description : postData.description,
        content : postData.content,
        image_url : `/uploads/${postData.url.filename}`,
        user_id : userId
    });

    if(savePost){
        res.json({message:"data saved successfully", post: savePost});
    }else{
        res.json({message:"an error happened"}) ;

    }

}