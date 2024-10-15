import { Router } from "express";
import {createCat} from '../controller/categoriesController' ;
import {checkIfAdmin,validation} from '../middleware/userAuth' ;

const router = Router();

router.post('/postCategories',validation,checkIfAdmin,createCat) ;


export default router ;