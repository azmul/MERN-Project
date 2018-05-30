import express from 'express';
import User from '../../models/User';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import keys from '../../config/dev';
import passport from 'passport';

const router = express.Router();

// @route  GET /api/users/test
// @desc   Test user route
// @route  public
router.get('/test',(req,res)=>{
    res.json({msg:"users"});
})

// @route  GET /api/users/register
// @desc   User register route
// @route  public
router.post('/register',(req,res)=>{
    const email = req.body.email;
    User.findOne({email: email})
       .then(user =>{
           if(user){
               res.status(400).json({email:"Email already exits"})
           }else{
               const avatar = gravatar.url(req.body.email, {s: '200', r: 'x', d: 'retro'}, true);
               const newUser = User({
                   name: req.body.name,
                   email: req.body.email,
                   avatar,
                   password: req.body.password
               })

               bcrypt.genSalt(10, (err, salt)=>{
                   bcrypt.hash(newUser.password, salt, (err, hash)=>{
                       if(err) throw err;
                       newUser.password = hash;
                       newUser.save()
                          .then(user=>res.json(user))
                          .catch(err=>console.log(err));
                   })
               })
           }
       })
})

// @route  GET /api/users/login
// @desc   Login User/ send user jwtoken
// @route  public

router.post('/login', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email},(err, user)=>{
        if(!user){
            return res.status(404).json({email: 'user not found'});
        }
        bcrypt.compare(password, user.password)
              .then(isMatch =>{
                  if(isMatch){
                      // User match
                      const payload = {id: user._id, name: user.name, avatar: user.avatar};
                      // sign token
                      jwt.sign(payload, keys.secretOrkey, {expiresIn: 3600}, (err, token)=>{
                         if(err) throw err;
                         res.json({
                             success: true,
                             token: `Bearer ${token}`
                         })
                      })
                  }else{
                      res.status(400).json({password: 'password not correct'});
                  }
              })
    })
})

// @route  GET /api/users/current
// @desc   Return current user
// @route  private

router.get('/current', 
    passport.authenticate('jwt',{session: false}),
    (req, res)=>{
        const { date, _id, name, email, avatar } = req.user;
        res.json( { date, _id, name, email, avatar });
    }
)
module.exports = router;