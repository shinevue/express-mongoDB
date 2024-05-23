const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Auth = mongoose.model("Auth");
const config = require("./config");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            Auth.findOne(jwt_payload.userId)
                .then(user => {
                    if(user) {
                        return done(null, user)
                    }
                    return done(null, false)
                }).catch(err => console.log(err))
        })
    )
};
