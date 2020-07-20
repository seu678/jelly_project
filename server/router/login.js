var express = require('express');
var router = express.Router();

var passport = require('passport');

// session for mongoose passport
// var Donor = require('../model/donor');
// var Recipient = require('../model/recipient');

// passport.use(Donor.createStrategy());
// passport.serializeUser(Donor.serializeUser());
// passport.deserializeUser(Donor.deserializeUser());
// passport.use(Recipient.createStrategy());
// passport.serializeUser(Recipient.serializeUser());
// passport.deserializeUser(Recipient.deserializeUser());

module.exports = function(contract, account){
    router.get('/', function(req, res) {
        res.render('login', {title: "login", user: req.user, message: req.flash('error')});
    });

    router.post('/', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true}), function(req, res) {
        console.log("로그인 성공")
        res.redirect('/');
    });
    return router;
}