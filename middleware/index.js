var middlewareObj = {},
    Lunch = require("../models/lunch");


middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Please log in before you register for a lunch!");
        res.redirect("/login");
    }
};


middlewareObj.checkLunchOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Lunch.findById(req.params.id, function(err, foundLunch){
            if(err) {
                res.redirect("back");
            } else {
                if(foundLunch.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
            
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isActive = function(req, res, next){
    if(req.user.active) {
        next();
    } else {
        req.flash("error", "Please confirm your email address first!");
        res.redirect("/lunches");
    }
};

module.exports = middlewareObj;

