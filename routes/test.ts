import express from 'express' ;
import { body, validationResult ,query, header } from 'express-validator';

const router = express.Router();

router.post('/testApi' ,body('obj').trim().isEmail(), function (req, res) {
    const obj = req.body ;
    const valid = validationResult(obj) ;
    if(valid.isEmpty()) {
        res.json({message: 'valid',header : req.headers}) ;
    }else{
        res.json({message: 'not valid'}) ;
    }
});
router.get('/testApi' , function (req:any, res) {
        res.json({message: 'valid',header : req.get('Server')}) ;
});



export default router;