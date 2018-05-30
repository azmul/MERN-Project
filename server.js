import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

import keys from './config/keys';
import users from './routes/api/users';
import profile from './routes/api/profile';
import posts from './routes/api/posts';

import {authenticate} from './config/passport';

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const dbUrl = keys.dbUrl;
mongoose
   .connect(dbUrl)
   .then(()=>console.log("mongodb connected"))
   .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
authenticate(passport)

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// app running
const PORT = process.env.port || 5000;
app.listen(PORT,()=>{
    console.log(`Server successfully running in ${PORT}`);
})