import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import keys from './config/keys';

import users from './routes/api/users';
import profile from './routes/api/profile';
import posts from './routes/api/posts';

const app = express();

// DB config
const dbUrl = keys.dbUrl;
mongoose
   .connect(dbUrl)
   .then(()=>console.log("mongodb connected"))
   .catch(err => console.log(err));

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// app running
const PORT = process.env.port || 5000;
app.listen(PORT,()=>{
    console.log(`Server successfully running in ${PORT}`);
})