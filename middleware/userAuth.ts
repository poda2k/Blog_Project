import {Request , Response , NextFunction} from 'express' ;
import jwt from 'jsonwebtoken' ;
import IError from '../interfaces/Error' ;

const error : IError = {} ;

export const validation = (req:any, res:Response , next : NextFunction) => {

    try{
        const wholeToken = req.get('Authorization');
        const token = wholeToken.replace('Bearer ','') ;
        const decoded : any  = jwt.verify(token , 'MySecretKey') ;
        if(decoded){
            req['userId'] = decoded.userId ;
            next() ;
        }else{
            error.massage = "invalid token" ;
            next(error) ;
        }
    }catch(err){
        // res.redirect('/user/signup') ;
        next("error in token validation  : " +err);
    }

}