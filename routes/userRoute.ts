import express  from "express";
import {validation} from '../middleware/userAuth' ;
import {signup,login} from '../controller/userController' ;

const route = express.Router();

route.post('/signup',signup);
route.post('/login',login);

export default route ;