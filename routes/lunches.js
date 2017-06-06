var express = require("express");
var router = express.Router();
var Lunch = require("../models/lunch");
var middleware = require("../middleware");

// INDEX ROUTE: show list of all Lunches
router.get("/", function(req, res){
    Lunch.find({}, function(err, lunches){
        if(err){
            console.log(err);
        } else {
            res.render("lunches/index", {lunches: lunches});
        }
    });
});

//NEW: show form to create Lunch
router.get("/new", middleware.isLoggedIn, middleware.isActive, function(req, res){
    res.render("lunches/new");
});

//SHOW: show one particular Lunch
router.get("/:id", function(req, res){
    Lunch.findById(req.params.id).populate("bookings").exec(function(err, foundLunch){
       if(err){
            console.log(err);
       } else {
            res.render("lunches/show", {lunch:foundLunch});
       }
    });

});

//CREATE: add new Lunch to database
router.post("/", middleware.isLoggedIn, middleware.isActive, function(req, res){
    var date = req.body.date;
    var time = req.body.time;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newLunch = {date: date, time: time, author: author};
    Lunch.create(newLunch, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/lunches");
        }
    });
});


// Edit Lunch
router.get("/:id/edit", middleware.checkLunchOwnership, function(req, res){
    Lunch.findById(req.params.id, function(err, foundLunch){
        if(err) {
            res.redirect("back");
        }
        res.render("lunches/edit", {lunch: foundLunch});
    });
});

// Update Lunch Route
router.put("/:id", middleware.checkLunchOwnership, function(req, res){
    Lunch.findByIdAndUpdate(req.params.id, req.body.lunch, function(err, updatedLunch){
        if(err){
            res.redirect("/lunches");
        } else {
            res.redirect("/lunches/" + req.params.id);
        }
    });
});

// Destroy Lunch route
router.delete("/:id", middleware.checkLunchOwnership, function(req, res){
    Lunch.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/lunches");
        } else {
            res.redirect("/lunches");
        }
    });
});

// Middleware


module.exports = router;
