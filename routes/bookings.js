var express = require("express");
var router = express.Router({mergeParams: true});
var Lunch = require("../models/lunch");
var Booking = require("../models/booking");


// Bookings New
router.get("/new", isLoggedIn,  function(req, res){
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
router.post("/", isLoggedIn, function(req, res){
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
                    booking.owner.username = req.user.username;
                    booking.save();
                    lunch.bookings.push(booking);
                    lunch.save();
                    req.flash("success", "Booking Successful. You have a new Lunch appointment!");
                    res.redirect("/lunches/" + lunch._id);
                }
            });
        }
    });
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Please log in before you register for a lunch!");
        res.redirect("/login");
    }
}

module.exports = router;