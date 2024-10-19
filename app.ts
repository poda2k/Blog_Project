import express from 'express';
import bcryptjs from 'bcryptjs';
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
import categoriesRoute from './routes/categoriesRoute';
import cat_post from './models/cat_post';

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

posts.belongsToMany(categories,{through:cat_post}) ;
categories.belongsToMany(posts,{through:cat_post}) ;

user.hasMany(categories,{foreignKey:'userId'}) ;
categories.belongsTo(user,{foreignKey:'userId'});

app.use('/home',homeRoute) ;
app.use('/user',userRoute);
app.use('/posts',postsRoute);
app.use('/categories',categoriesRoute);

app.use('/tests',testRoutes) ;
// const hashedPass = bcryptjs.hashSync('podasaccount101',8) ;
// user.bulkCreate([
//     {   id:0 ,
//         username : "poda2k",
//         email:"podayasser101@gmail.com",
//         phone : 1287386582,
//         password : hashedPass,
//         isAdmin : true
//     }]
// ).then((response) => {
//     console.log(response);
// })
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
// cat_post.bulkCreate([{
//     postId:1 ,
//     categoryId:1
// }]);


app.use("/uploads",express.static("uploads"));

DBC.sync()
.then(() =>{
    app.listen(port,()=>{
        console.log("app up and running"+ port) ;
    }) ;
}).catch((err) =>{
console.log("error in database connection "+err);
});
