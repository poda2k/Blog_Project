import express from 'express';
import dotenv from 'dotenv' ;
import homeRoute from './routes/homeRoute';
import userRoute from './routes/userRoute';
import DBC from './models/connection';
import posts from './models/posts';
import user from './models/user';


dotenv.config() ;


const app = express();
const port = process.env.PORT||8030 ; // .env not operational 
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));
user.hasMany(posts,{foreignKey:'user_id'});
posts.belongsTo(user,{foreignKey:'user_id'});

app.use('/home',homeRoute) ;
app.use('/user',userRoute);

DBC.sync()
.then(() =>{
    app.listen(port,()=>{
        console.log("app up and running"+ port) ;
    }) ;
}).catch((err) =>{
 console.log("error in database connection "+err);
});
