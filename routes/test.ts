import express from 'express' ;
import { body, validationResult ,query } from 'express-validator';

const router = express.Router();

router.post('/testApi' ,body('obj').trim().isEmail(), function (req, res) {
    const obj = req.body ;
    const valid = validationResult(obj) ;
    if(valid.isEmpty()) {
        res.json({message: 'valid'}) ;
    }else{
        res.json({message: 'not valid'}) ;
    }
})


export default router;