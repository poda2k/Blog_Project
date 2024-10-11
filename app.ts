import express from 'express';
import dotenv from 'dotenv' ;
import homeRoute from './routes/homeRoute';
import userRoute from './routes/userRoute';
import DBC from './models/connection';
import posts from './models/posts';
import user from './models/user';
import comments from './models/comments';
import categories from './models/categories';
import postsRoute from './routes/postsRoute' ;

import testRoutes from './routes/test' ;

dotenv.config() ;


const app = express();
const port = process.env.PORT||8030 ; // .env not operational 
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));

user.hasMany(posts,{foreignKey:'user_id'});
posts.belongsTo(user,{foreignKey:'user_id'});

user.hasMany(comments,{foreignKey:'userId'}) ;
comments.belongsTo(user,{foreignKey:'userId'});

posts.hasMany(comments,{foreignKey:'postId'});
comments.belongsTo(posts,{foreignKey:'postId'});

posts.belongsToMany(categories,{through:'cat_post'}) ;

app.use('/home',homeRoute) ;
app.use('/user',userRoute);
app.use('/posts',postsRoute);

app.use('/tests',testRoutes) ;


//multer configuration 

// const storage  = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"uploads/");
//     },
//     filename:(res,file,cb)=>{
//         cb(null,Date.now()+path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage });



app.use("/uploads",express.static("uploads"));

DBC.sync()
.then(() =>{
    app.listen(port,()=>{
        console.log("app up and running"+ port) ;
    }) ;
}).catch((err) =>{
 console.log("error in database connection "+err);
});
