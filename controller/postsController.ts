import posts from '../models/posts';
import { Request , Response } from 'express';
import { IPostData } from '../interfaces/dataBaseInterfaces';


export const getAllPosts = async(req : Request, res : Response) =>{

    const Allposts : IPostData[] = await posts.findAll();

    if(Allposts.length==0){
        res.json({message:"no posts yet !!!"}) ;
    }else{
        res.json({posts:Allposts}) ;
    }
}