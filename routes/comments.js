var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware/index.js");
    
// =============================
// Comments Route
// =============================

router.get("/new", middleware.isLoggedIn, function(req, res) {
    // find campgrpund by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){ 
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});    
        }
    });
});

// New Comment
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong")
                    console.log(err);
                } else{
                    // add username and id to comments
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added")
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// Comments Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});        
        }
    });
});


// Comments Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
 Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id );
      }
   });
});


// // Comment Delete

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
       if(err){
           res.redirect("back");
       } else {
           Campground.findByIdAndUpdate(req.params.id,{
               $pull: {
                   comments: comment.id
               }
           }, function(err){
               if(err){
                   console.log(err)
               }else {
                   req.flash("success", "Comment deleted")
                   res.redirect("/campgrounds/" + req.params.id);
                }
            });
            }
        });
    });

// middleware

module.exports = router;
