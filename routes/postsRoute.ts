import  express  from "express";
import {getAllPosts,createPost,getSinglePost} from '../controller/postsController';
import {upload} from '../middleware/fileUpload' ;
import {validation} from '../middleware/userAuth' ;
import {validateUserInput} from '../middleware/dataValidation//validationMiddleware';
import {postSchema} from '../middleware/dataValidation/validationSchemas';

const router = express.Router();

router.get('/getPosts',getAllPosts);
router.get('/getSinglePost/:postId',getSinglePost);


router.post('/createPost',validation,upload.single('image'),validateUserInput(postSchema),createPost);

export default router ;