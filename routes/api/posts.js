import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import Post from '../../models/Post';
import Profile from '../../models/Profile';

import validatePostInput from '../../validations/post';

const router = express.Router();

// @route  GET /api/posts/test
// @desc   Test posts route
// @route  public
router.get('/test',(req,res)=>{
    res.json({msg:"posts"});
})

// @route  GET /api/posts
// @desc   Get Post
// @route  Public
router.get('/',(req,res)=>{
    Post.find()
        .sort({date: -1})
        .then(posts=>res.json(posts))
        .catch(err=>res.status(404).json({post: 'Posts not found'}))
})

// @route  GET /api/posts/:id
// @desc   Get Post by id
// @route  Public
router.get('/:id',(req,res)=>{
    Post.findById(req.params.id)
        .then(post=>res.json(post))
        .catch(err=>res.status(404).json({post: 'Post not found'}))
})

// @route  POST /api/posts
// @desc   Create Post
// @route  Private
router.post('/',passport.authenticate('jwt',{session: false}),(req,res)=>{
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid){
       errors.post = "There is no post";
       return res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    })
    newPost.save().then(post=>res.json(post));
})

// @route  DELETE /api/posts/:id
// @desc   Delete Post
// @route  Private
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id})
           .then(profile=>{
                Post.findById(req.params.id)
                    .then(post=>{
                        if(post.user.toString() !== req.user.id){
                           return res.status(401).json({msg: 'Unauthorized'})
                        }
                        // delete
                        post.remove().then(()=> res.json({success: true}));
                    }).catch(err=>res.status(404).json({profile: 'Post not found', success: false}))
           }).catch(err=>res.status(404).json({profile: 'Profile not found', success: false}))
})

module.exports = router;