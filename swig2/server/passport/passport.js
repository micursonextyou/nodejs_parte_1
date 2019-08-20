const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuarios = require('../modelos/usuario');

passport.serializeUser((user, done) => {


    done(null, user._id);
});

passport.deserializeUser(async(id, done) => {
    const user = Usuarios.findById(id);

    await done(null, user);
});

passport.use('local-singin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass',
    passReqToCallback: true
}, (req, email, pass, done) => {
    const userE = Usuarios.findOne({ email: email, pass: pass }, function(err, user) {
        if (user) {
            return done(null, user);
        }
    });


}));