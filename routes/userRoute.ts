import express   from "express";
import {validateUserInput} from '../middleware/dataValidation/validationMiddleware' ;
import {loginSchema,signupSchema} from '../middleware/dataValidation/validationSchemas' ;
import {query ,body} from 'express-validator' ;
import {signup,login} from '../controller/userController' ;

const route = express.Router();

route.post('/signup',validateUserInput(signupSchema),signup);
route.post('/login',validateUserInput(loginSchema),login);

export default route ;