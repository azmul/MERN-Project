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
module.exports = router;