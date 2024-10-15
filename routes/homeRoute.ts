import express from "express";
import { home } from "../controller/homeController";
import {validation,checkIfAdmin} from '../middleware/userAuth' ;

const routes = express.Router() ;

routes.get('/getHome',validation,home);

export default routes ;