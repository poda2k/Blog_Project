import {Request , Response , NextFunction} from 'express' ;
import jwt from 'jsonwebtoken' ;

export const validation = (req:any, res:Response , next : NextFunction) => {

    try{
        const wholeToken = req.get('Authorization');
        const token = wholeToken.replace('Bearer ','') ;
        const decoded :any = jwt.verify(token , 'MySecretKey') ;
        if(decoded){
            req['userId'] = decoded.userId ;
            req['isAdmin'] = decoded.isAdmin ;
            next() ;
        }else{
            res.json({message:"access denied"}) ;
        }
    }catch(err){
        const error = new Error('error in token validation'+err);
        next(error) ;
    }

}

export const checkIfAdmin = (req:any, res:Response , next:NextFunction) => {

    console.log(req['isAdmin']);
    if(req['isAdmin']){
        next();
    }else{
        res.json({message: "you cant access this page"});
    }
};