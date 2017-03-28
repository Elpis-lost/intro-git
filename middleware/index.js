var Campground  = require("../models/campground"),
    Comment     = require("../models/comment");

// all middleware

var middlewareObj   = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()){
            Campground.findById(req.params.id, function (err, foundCampground) {
                if(err){
                    req.flash("error","Campground not found");
                    res.redirect("back");
                } else{
            // does the user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                     req.flash("error", "Permission denied")
                    res.redirect("back");
                }       
            }
        });   
    } else {
        req.flash("error", "You need to login")
        res.redirect("back");
    };
};

middlewareObj.checkCommentOwnership = function (req, res, next){
    if (req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err){
                    res.redirect("back");
                } else{
            // does the user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You can only edit your own comment(s)")
                    res.redirect("back");
                }       
            }
        });   
    } else {
        req.flash("error", "You need to login")
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to login first, or create and account!");
    res.redirect("/login");
};


module.exports = middlewareObj;
