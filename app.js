var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    flash               = require("connect-flash"),
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override"),
    seedDB              = require("./seeds"),
    User                = require("./models/user");
    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/index");

console.log(process.env.DATABASEURL);   
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASEURL);
// mongoose.connect("mongodb://Nadia:645260@ds041536.mlab.com:41536/yelpcamp");



app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

app.use(flash());

// seedDB(); //seed the database


// Passport Config

app.use(require("express-session")({
    secret:"coffee=life",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash("success");
    next();
});

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("IT LIVES!");
});