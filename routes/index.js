var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


// route route
router.get("/", function(req, res){
    res.render("landing");
});


router.get("/register", function(req,res){
    res.render("register");
});

// SIGN UP
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Lunch Roulette, " + user.username);
            res.redirect("/lunches");
        });
    });
});

// Log In Form
router.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/lunches", 
        failureRedirect: "/login"
    }), function(req, res){
    res.send("login logic in here");
});

// log out route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "successfully Logged you out.");
    res.redirect("/lunches");
});

module.exports = router;