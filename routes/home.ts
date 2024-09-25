import express from "express";

const routes = express.Router() ;

routes.get('/getHome', (req, res) => {
    res.json({massage:"hello world"}) ;
});

export default routes ;