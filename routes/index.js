var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
const nodemailer = require('nodemailer');
'use strict';

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lunch.roulette777@gmail.com',
        pass: 'q8F3hc7FvUAH64ffd8Bj'
    }
});

// route route
router.get("/", function(req, res){
    res.render("landing");
});


router.get("/register", function(req,res){
    res.render("register");
});

// SIGN UP
router.post("/register", function(req, res){
    let verCode = Math.floor(Math.random() * 1000000000 + 1000000000);
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        verificationCode: verCode
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.render("register");
        }
        let mailOptions = createMailOptions(req.body.email, verCode, user._id);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Lunch Roulette, " + user.username);
            res.redirect("/lunches");
        });
    });
    
});

router.get("/activate/:user_id/:v_id", function(req, res){
    User.findById(req.params.user_id, function(err, foundUser){
        if(err){
            req.flash("error", "not a valid User");
            res.redirect("/");
        } else {
            console.log(foundUser.verificationCode);
            console.log(req.params.v_id);
            if(foundUser.verificationCode===Number(req.params.v_id)){
                foundUser.active = true;
                foundUser.save();
                req.flash("success", "You have activated your account, " + foundUser.username + "!");
            } else {
                req.flash("error", "Invalid activation code, my Friend");
            }
            res.redirect("/lunches");
        }
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
    })
);

// log out route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "successfully Logged you out.");
    res.redirect("/lunches");
});


function createMailOptions(address, verID, userID) {
    console.log(address);
    return {
        from: '"Lunch Roulette" <lunch.roulette777@gmail.com>', // sender address
        to: address, // list of receivers
        subject: 'Hello', // Subject line
        text: "https://webdevbootcamp-curtis7goodman.c9users.io/activate/" + userID + "/" + verID + " THIS IS YOUR VERURL", // plain text body
        html: "https://webdevbootcamp-curtis7goodman.c9users.io/activate/" + userID + "/" + verID + " THIS IS YOUR VERURL" // html body
    };
}

module.exports = router;