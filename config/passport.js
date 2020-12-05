const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const key = require("./keys");
const User = require("../models/User")

module.exports = passport => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = key.secretOrKey

    passport.use(
        new JwtStrategy(
            opts,
            (jwt_payload, done) => {
                User.findOne({ id: jwt_payload.sub }, (err, user) => {
                    if (err) {
                        return done(err, false)
                    }
                    if (user) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
            }
        )
    )
}