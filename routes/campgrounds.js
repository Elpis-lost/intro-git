var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware/index.js"),
    geocoder    = require("geocoder");


// Index = shows all campgrounds
router.get("/", function(req, res){
    // Get all campgroundsfrom the db
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
             res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
      }
    });
});

// Add new campgound(s)
router.post("/", middleware.isLoggedIn, function(req, res){
        //get data from form and add to camps aarray
        var name        = req.body.name;
        var image       = req.body.image;
        var price       = req.body.price;
        var description = req.body.description,
            author      = {
                    id: req.user._id,
                    username: req.user.username
            };
        geocoder.geocode(req.body.location, function (err, data){
            var lat      = data.results[0].geometry.location.lat,
                lng      = data.results[0].geometry.location.lng,
                location = data.results[0].formatted_address;
      
        var newCampground = {name: name, price:price, location: location, lat: lat, lng: lng, image: image, description: description, author: author};
    //   Create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
             // redirect back to campground page
        res.redirect("/campgrounds");
        }
    });
});
});

// NEW -- Form to add camprounds
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});

// Show more info about a single campground
router.get("/:id", function(req, res) {
    // find campgrounds with provided id
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function (err, foundCampground) {
                res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
     geocoder.geocode(req.body.location, function (err, data){
        var lat      = data.results[0].geometry.location.lat,
            lng      = data.results[0].geometry.location.lng,
            location = data.results[0].formatted_address,
            newData  = {name: req.body.campground.name, image: req.body.campground.image, description: req.body.campgound.description, price: req.body.campgound.price, location: location, lat: lat, lng: lng};
        // Find an update the correct campground
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else{
              // Redirect to show page  // Redirect to show page
            req.flash("success", "Successfully updated");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
});
});

// Destroy/Delete Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// middleware

module.exports = router;
