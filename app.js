const express = require('express');
const helmet = require('helmet');
const mongoSantizie = require('express-mongo-sanitize');
const xss = require('xss-clean');
const blogRoute = require('./Routes/blogRoute');
const blog_categoryRoute = require('./Routes/blog_categoryRoute');
const userRoute = require('./Routes/userRoute');
const commentRouter = require('./Routes/commentRouter');


const app = express();

app.use(express.json());
app.use(helmet());
app.use(mongoSantizie());
app.use(xss());


app.get('/api',(req,res)=>{
    res.send("hello");
});


app.use('/v1/api/blog/',blogRoute);
app.use('/v1/api/category/',blog_categoryRoute);
app.use('/v1/api/users/',userRoute);
app.use('/v1/api/comment/',commentRouter);


app.use('*',(req,res)=>{
    res.status(500).json({
        status:"error",
        message:"mistake for this code"
    })
})


module.exports = app;