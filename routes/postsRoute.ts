import  express  from "express";
import {getAllPosts} from '../controller/postsController';

const router = express.Router();

router.get('/getPosts',getAllPosts);


export default router ;