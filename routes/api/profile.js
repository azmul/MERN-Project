import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

// Load Profile Model
import Profile from '../../models/Profile';
// Load User model
import User from '../../models/User';

import validateProfileInput from '../../validations/profile';
import validateExperienceInput from '../../validations/experience';
import validateEducationInput from '../../validations/education';

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
               .populate('user',['name','email','avatar'])
               .then(profile=>{
                   if(!profile){
                       errors.noprofile = 'There is no profile of this user';
                       return res.status(404).json(errors);
                   }
                   res.json(profile);
               }).catch(err=> res.status(404).json(err));
    }
)

// @route  GET /api/profile/all
// @desc   Get all profile
// @route  Public
router.get('/all',(req,res)=>{
    const errors = {};
    Profile.find()
           .populate('user',['name','email','avatar'])
           .then(profiles=>{
               if(!profiles){
                   errors.profiles = "There are no profiles";
                   return res.status(404).json(errors);
               }
               res.json(profiles);
           })
           .catch(err=>res.json({profiles:'There are no profiles'}))
})

// @route  GET /api/profile/handle/:handle
// @desc   Get profile by handle
// @route  Public
router.get('/handle/:handle',(req,res)=>{
    const errors ={};
    Profile.findOne({handle: req.params.handle})
           .populate('user', ['name','email','avatar'])
           .then(profile=>{
               if(!profile){
                   errors.handle = 'There is no user of this profile';
                   res.status(404).json(errors);
               }
               res.json(profile);
           }).catch(err=>res.status(404).json({profile:'There is no user of this profile'}));
})

// @route  GET /api/profile/user/:user_id
// @desc   Get profile by handle
// @route  Public
router.get('/user/:user_id',(req,res)=>{
    const errors ={};
    Profile.findOne({user: req.params.user_id})
           .populate('user', ['name','email','avatar'])
           .then(profile=>{
               if(!profile){
                   errors.handle = 'There is no user of this profile';
                   res.status(404).json(errors);
               }
               res.json(profile);
           }).catch(err=>res.status(404).json({profile:'There is no user of this profile'}));
})

// @route  POST /api/profile
// @desc   create or edit user profile
// @route  private
router.post('/', passport.authenticate('jwt',{session: false}),
    (req,res)=>{
        const {errors, isValid} = validateProfileInput(req.body);
        // Check error
        if(!isValid){
           return res.status(400).json(errors);
        }
        const profileFileds = {};
        profileFileds.user = req.user.id;

        if(req.body.handle) profileFileds.handle = req.body.handle;
        if(req.body.status) profileFileds.status = req.body.status;
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
        if(req.body.linkedin) profileFileds.social.linkedin = req.body.linkedin;
        if(req.body.instagram) profileFileds.social.instagram = req.body.instagram;

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

// @route  GET /api/profile/experience
// @desc   Add experience to profile
// @route  Private
router.post('/experience',passport.authenticate('jwt',{session:false}),
            (req,res)=>{
              const {errors, isValid} = validateExperienceInput(req.body);
              if(!isValid){
                  return res.status(400).json(errors);
              }
              Profile.findOne({user: req.user.id})
                     .then(profile=>{
                         const newExp = {
                             title: req.body.title,
                             company: req.body.company,
                             location: req.body.location,
                             from: req.body.from,
                             to: req.body.to,
                             current: req.body.current,
                             description: req.body.description
                         }
                         // Add exp to profile
                         profile.experience.unshift(newExp);
                         profile.save(profile).then(profile=>res.json(profile));
                     })
            })

// @route  GET /api/profile/education
// @desc   Add education to profile
// @route  Private
router.post('/education',passport.authenticate('jwt',{session:false}),
            (req,res)=>{
              const {errors, isValid} = validateEducationInput(req.body);
              if(!isValid){
                  return res.status(400).json(errors);
              }
              const {school,degree,filedofStudy,from,to,current,description} = req.body;
              Profile.findOne({user: req.user.id})
                     .then(profile=>{
                         const newEdu = {
                             school: school,
                             degree: degree,
                             filedofStudy: filedofStudy,
                             from: from,
                             to: to,
                             current: current,
                             description: description
                         }
                         // Add exp to profile
                         profile.education.unshift(newEdu);
                         profile.save(profile).then(profile=>res.json(profile));
                     })
            })

// @route  DELETE /api/experience/:exp_id
// @desc   Delete experience from profile
// @route  Private 
router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id})
           .then(profile=>{
               const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
               profile.experience.splice(removeIndex,1);
               profile.save()
                      .then(profile=> res.json(profile));
           }).catch(err=>res.status(404).json(err))
})

// @route  DELETE /api/education/:edu_id
// @desc   Delete education from profile
// @route  Private 
router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({user: req.user.id})
           .then(profile=>{
               const removeIndex = profile.education.map(item => item.id).indexOf(req.params.exp_id);
               profile.education.splice(removeIndex,1);
               profile.save()
                      .then(profile=> res.json(profile));
           }).catch(err=>res.status(404).json(err))
})

// @route  DELETE /api/profile
// @desc   Delete uer and profile
// @route  Private 
router.delete('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    console.log(req);
    Profile.findOneAndRemove({user: req.user.id})
           .then(()=>{
               User.findOneAndRemove({_id: req.user.id})
                   .then(()=>res.json({success:true}))
                   .catch(err=>console.log(err))
           }).catch(err=>console.log(err));
})

module.exports = router;