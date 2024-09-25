import express from 'express';
import dotenv from 'dotenv' ;
import homeRoute from './routes/home';
import DBC from './models/connection'; 

dotenv.config() ;


const app = express();
const port = process.env.PORT||8030 ; // .env not operational 

app.use('/home',homeRoute) ;

DBC.sync()
.then(() =>{
    app.listen(port,()=>{
        console.log("app up and running"+ port) ;
    }) ;
}).catch((err) =>{
 console.log("error in database connection "+err);
});
