import  express  from "express";
import {getAllPosts,createPost} from '../controller/postsController';
import {upload} from '../middleware/fileUpload' ;
import {validation} from '../middleware/userAuth' ;

const router = express.Router();

router.get('/getPosts',getAllPosts);
router.post('/createPost',validation,upload.single('image'),createPost);

export default router ;