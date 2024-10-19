import { Router } from "express";
import {createCat,getAllCat} from '../controller/categoriesController' ;
import {checkIfAdmin,validation} from '../middleware/userAuth' ;

const router = Router();

router.post('/postCategories',validation,checkIfAdmin,createCat) ;
router.get('/getAllCategories',validation,getAllCat);

export default router ;