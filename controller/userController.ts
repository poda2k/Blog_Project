import { Request ,Response } from "express"
import { Op } from "sequelize";
import user from "../models/user";
import bcryptjs from 'bcryptjs' ;
import jwt from 'jsonwebtoken' ;
import {IUserdata} from '../interfaces/dataBaseInterfaces' ;
import { Hash } from "crypto";

export const signup = async (req : Request, res :Response)=> {

    const userData : IUserdata = req.body ;
    try{
        const checkForUser = await user.findOne(
            {
                where:{
               [Op.or]:[
                {username : userData.username},
                {email : userData.email}
               ]
            }
        });
        if(checkForUser){
            res.status(208).json({message:"this username or email already exists"});
        }else{
            const  hash = bcryptjs.hashSync(userData.password!, 8);

            const createUser =  await user.create(
                            {
                                username : userData.username,
                                email:userData.email,
                                phone : userData.phone,
                                password : hash
                            }
                        );
                const token = jwt.sign({
                    userId : createUser.id
                },'MySecretKey',
                { expiresIn: "1d" });
            res.status(201).json({message:"user registered successfully", createUser , token:token});
            // another Bcrypt solution //
        //    const Bc = await bcryptjs.genSalt(10,(err,salt)=>{
        //         bcryptjs.hash(password,salt,(err,hash)=>{
        //             if(err){
        //                 res.json({message:"Error in hash function"});
        //             }
        //             const createUser =  user.create(
        //                 {
        //                     username : username,
        //                     email:email,
        //                     phone : phone,
        //                     password : hash
        //                 }
        //             );
        //             res.json({message:"user registered successfully", createUser});
        //         });
        //     });
        }
    }catch(e){
        console.log("error in signup", e);
        res.status(400).json({message:"error in creating user"+e}) ;
    }

}

export const login = async (req : Request, res : Response) => {
    const userData : IUserdata = req.body ;

    const checkForUser = await user.findOne(
        {
            where:{
                username: userData.username
            }
        }
    );

    if(checkForUser){

       const passCheck =  bcryptjs.compareSync(userData.password!, checkForUser.password);

       if(passCheck){

        const token = jwt.sign({
            userId : checkForUser.id
        },'MySecretKey',
        { expiresIn: "1d" });

        res.status(200).json({message:"access granted",token : token });
       }else{
        res.status(401).json({message:"access denied"});

       }
    }else{
        res.status(400).json({massage: "this username doesn`t exist"});
    }

}

export const getSingleUser = async(req: Request, res: Response)=>{
    const userId = req.params.userId;

    try {
        const fetchSingleUser = await user.findByPk(userId);
        if(fetchSingleUser){
            res.status(200).json({message:"user fetched" , user : fetchSingleUser});
        }else{
            res.status(404).json({message: "user doesn`t exist"}) ;
        }
    }catch(err){
        res.status(400).json({message: "error fetching single user"+err});
    }
}