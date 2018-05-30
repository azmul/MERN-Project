import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import mongoose from 'mongoose';
const User = mongoose.model('users');
import keys from './keys';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;

export const authenticate = passport =>{
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done)=>{
            User.findById(jwt_payload.id)
                .then(user=>{
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                        // or you could create a new account
                    }
                })
                .catch(err=>console.log(err));
        })
    )
}