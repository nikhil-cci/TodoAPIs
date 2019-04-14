var passport = require('passport');
var passportJWT = require('passport-jwt');
var LocalStrategy = require('passport-local');
var ExtractJwt = passportJWT.ExtractJwt;
var JWTStrategy = passportJWT.Strategy;
const db = require('../models/index')
const constants = require('../utils/constants');
var userController = require('../controllers/user.controller');

const localOpts = {
    usernameField: 'email'
};
const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
    try {
        const user = await db.User.findOne({
            where: {
                email : email
            }
        });
        if (!user) {
            return done(null, false);
        } else if (!await userController.authenticateUser(user, password)) {
            return done(null, false);
        }
        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});

// Jwt strategy
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload, done) => {
    try {
        const user = await db.User.findOne({
            where : {
                id : payload._id
            }
        });

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const authLocal = passport.authenticate('local', {
    session: false
});
const authJwt = passport.authenticate('jwt', { session: false });

module.exports = {
    authLocal,
    authJwt
}