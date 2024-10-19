import {Request , Response , NextFunction} from 'express' ;
import jwt, { JwtPayload } from 'jsonwebtoken' ;

export const validation = (req:Request & {userId?:string , isAdmin?:boolean}, res:Response , next : NextFunction) => {

    try{
        const wholeToken:string | undefined = req.get('Authorization');
        if(!wholeToken){
            res.json({message: 'you must login or signup first !!'}) ;
        }
        const token : string = wholeToken!.replace('Bearer ','') ;
        const decoded = jwt.verify(token , 'MySecretKey') as JwtPayload ;
        if(decoded){
            req.userId = decoded.userId ;
            req.isAdmin = decoded.isAdmin ;
            next() ;
        }else{
            res.json({message:"access denied"}) ;
        }
    }catch(err){
        const error = new Error('error in token validation'+err);
        next(error) ;
    }

}

export const checkIfAdmin = (req:Request &{isAdmin?:Boolean}, res:Response , next:NextFunction) => {

    console.log(req.isAdmin);
    if(req.isAdmin){
        next();
    }else{
        res.json({message: "you cant access this page"});
    }
};