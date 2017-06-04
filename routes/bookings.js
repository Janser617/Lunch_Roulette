"use strict";

var express = require("express");
var router = express.Router({mergeParams: true});
var Lunch = require("../models/lunch");
var Booking = require("../models/booking");
var middleware = require("../middleware");
const nodemailer = require('nodemailer');


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lunch.roulette777@gmail.com',
        pass: 'q8F3hc7FvUAH64ffd8Bj'
    }
});


// Bookings New
router.get("/new", middleware.isLoggedIn,  function(req, res){
    Lunch.findById(req.params.id, function(err, lunch){
        if(err){
            req.flash("error", err.message);
            res.redirect("/lunches");
        } else {
            res.render("bookings/new", {lunch: lunch});
        }
    });
    
});

// Bookings Create
router.post("/", middleware.isLoggedIn, function(req, res){
    Lunch.findById(req.params.id, function(err, lunch){
        if(err){
            console.log(err);
            req.flash("error", "Lunch not found");
            res.redirect("/lunches");
        } else {
            Booking.create({}, function(err, booking){
                if(err){
                    console.log(err);
                    req.flash("error", err.message);
                    res.redirect("/lunches");
                } else {
                    booking.owner.id = req.user._id;
                    booking.owner.email = req.user.email;
                    booking.save();
                    lunch.bookings.push(booking);
                    lunch.save();
                    // setup email data with unicode symbols
                    let mailOptions = createMailOptions(req.user.email, lunch);
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error);
                        }
                        console.log('Message %s sent: %s', info.messageId, info.response);
                    });
                    req.flash("success", "Booking Successful. You have a new Lunch appointment!");
                    res.redirect("/lunches/" + lunch._id);
                }
            });
        }
    });
});

function createMailOptions(address, lunch) {
    return {
        from: '"Lunch Roulette" <lunch.roulette777@gmail.com>', // sender address
        to: address, // list of receivers
        subject: 'Hello', // Subject line
        text: 'Your appointment is on ' + lunch.date + ', from ' + lunch.time + '. Enjoy!', // plain text body
        html: 'Your appointment is on ' + lunch.date + ', from ' + lunch.time + '. Enjoy!' // html body
    };
}


module.exports = router;