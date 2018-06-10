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

// @route  POST /api/posts/like/:id
// @desc   Like Post
// @route  Private
router.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id})
           .then(profile=>{
               Post.findById(req.params.id)
                   .then(post=>{
                       if(post.likes.filter(like=> like.user.toString() === req.user.id).length>0){
                          return res.status(400).json({like:'User already like this post'})
                       }
                       // add like 
                       post.likes.unshift({user: req.user.id});
                       post.save().then(post=>res.json(post))
                   })
           }).catch(err=>res.status(404).json({post:'No post found', success: false}))
})

// @route  POST /api/posts/unlike/:id
// @desc   unlike Post
// @route  Private
router.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id})
           .then(profile=>{
               Post.findById(req.params.id)
                   .then(post=>{
                       if(post.likes.filter(like=> like.user.toString() === req.user.id).length === 0){
                          return res.status(400).json({unlike:'You do not like this post'})
                       }
                       // add like 
                       const removeIndex = post.likes.map(item=> item.user.id.toString()).indexOf(req.user.id);
                       post.likes.splice(removeIndex,1);
                       post.save().then(post=>res.json(post))
                   })
           }).catch(err=>res.status(404).json({post:'No post found', success: false}))
})

// @route  POST /api/posts/comment/:id
// @desc   Add comment to post
// @route  Private
router.post('/comment/:id', passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid){
       errors.post = "There is no post";
       return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
        .then(post=>{
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }
            post.comments.unshift(newComment);
            post.save().then(post=>res.json(post));
        }).catch(err=> res.status(404).json({post: 'no post found', success: false}))
})

// @route  DELETE /api/posts/comment/:id/:comment_id
// @desc   Remove comment from post
// @route  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt',{session:false}),(req,res)=>{
    Post.findById(req.params.id)
        .then(post=>{
           // check comment exits
           if(post.comments.filter((item=> item.id.toString() === req.params.comment_id).length === 0)){
              return res.status(404).json({comment: 'Comment does not exits'})
           }
           const removeIndex = post.comments.map(item=>item.id).indexOf(req.params.comment_id);
           post.comments.splice(removeIndex,1);
           post.save().then(post=>res.json(post));
        }).catch(err=> res.status(404).json({post: 'no post found', success: false}))
})

module.exports = router;