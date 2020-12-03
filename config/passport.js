const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const opts = {};
const key = require("./keys");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;


module.exports = passport => {
    passport.use(
        new JwtStrategy(
            opts,
            (jwt_payload, done) => {
                User.findById(jwt_payload.email).then(user => {
                    if (user) {
                        return done(null, user)
                    }
                    return done(null, false)
                }).catch(e => console.log(e))
            }
        )
    )
}