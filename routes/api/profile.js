import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

// Load Profile Model
import Profile from '../../models/Profile';
// Load User model
import User from '../../models/User';

const router = express.Router();

// @route  GET /api/profile/test
// @desc   Test profile route
// @route  public
router.get('/test',(req,res)=>{
    res.json({msg:"profile"});
})

// @route  GET /api/profile
// @desc   Get current user profile
// @route  private
router.get('/', passport.authenticate('jwt',{session: false}),
    (req,res)=>{
        const errors = {};
        Profile.findOne({user: req.user.id})
               .then(profile=>{
                   if(!profile){
                       errors.noprofile = 'There is no profile of this user';
                       return res.status(404).json(errors);
                   }
                   res.json(profile);
               }).catch(err=> res.status(404).json(err));
    }
)

// @route  POST /api/profile
// @desc   POST  user profile
// @route  private
router.post('/', passport.authenticate('jwt',{session: false}),
    (req,res)=>{
        const profileFileds = {};
        profileFileds.user = req.user.id;

        if(req.body.handle) profileFileds.handle = req.body.handle;
        if(req.body.company) profileFileds.company = req.body.company;
        if(req.body.website) profileFileds.website = req.body.website;
        if(req.body.location) profileFileds.location = req.body.location;
        if(req.body.bio) profileFileds.bio = req.body.bio;
        if(req.body.githubusername) profileFileds.githubusername = req.body.githubusername;
        // Skills splits into array
        if(typeof req.body.skills !== undefined){
          profileFileds.skills = req.body.skills.split(',');
        }
        // Socials
        profileFileds.social = {};
        if(req.body.youtube) profileFileds.social.youtube = req.body.youtube;
        if(req.body.twitter) profileFileds.social.twitter = req.body.twitter;
        if(req.body.facebook) profileFileds.social.facebook = req.body.facebook;
        if(req.body.linkedin) profileFileds.linkedin = req.body.linkedin;
        if(req.body.instagram) profileFileds.instagram = req.body.instagram;

        Profile.findOne({user: req.user.id})
               .then(profile=>{
                   if(profile){
                       // Update
                       Profile.findOneAndUpdate(
                           {user: req.user.id},
                           {$set: profileFileds}, 
                           {new: true})
                           .then(profile=>res.json(profile));
                   }else{
                       // Check if handle exits
                       Profile.findOne({handle: profileFileds.handle})
                            .then(profile=>{
                                if(profile){
                                    errors.handle = 'That handle already exits';
                                    res.status(400).json(errors);
                                }
                                new Profile(profileFileds).save().then(profile=>res.json(profile));
                            })
                   }
               })
        
    }
)


module.exports = router;