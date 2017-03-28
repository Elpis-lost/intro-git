var mongoose    = require("mongoose"),
    Campground  = require("./models/campground")
    Comment     = require("./models/comment")

var data = [
    {
        name: "Little Elk",
        image: "https://source.unsplash.com/OivhEmfO-kk/1250x950",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar mattis scelerisque. Phasellus a metus eros. Aenean non ligula eu velit faucibus gravida. In finibus lectus ac ipsum consectetur finibus. Fusce eu tincidunt lacus, sed facilisis urna. Phasellus ac ultrices odio, nec porttitor sem. Aenean posuere consectetur arcu vitae fermentum. Sed placerat, libero id vestibulum rhoncus, ipsum orci consectetur diam, sit amet sodales magna augue id nunc. In bibendum facilisis neque, vel congue ante ultricies ultricies.",
    },
    {
        name: "Rush Creek",
        image: "https://source.unsplash.com/C3PcUJ1kSgA/1250x950",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar mattis scelerisque. Phasellus a metus eros. Aenean non ligula eu velit faucibus gravida. In finibus lectus ac ipsum consectetur finibus. Fusce eu tincidunt lacus, sed facilisis urna. Phasellus ac ultrices odio, nec porttitor sem. Aenean posuere consectetur arcu vitae fermentum. Sed placerat, libero id vestibulum rhoncus, ipsum orci consectetur diam, sit amet sodales magna augue id nunc. In bibendum facilisis neque, vel congue ante ultricies ultricies.",
    },
    {
        name: "Mammoth",
        image: "https://source.unsplash.com/6ufqEvxq90w/1250x950",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar mattis scelerisque. Phasellus a metus eros. Aenean non ligula eu velit faucibus gravida. In finibus lectus ac ipsum consectetur finibus. Fusce eu tincidunt lacus, sed facilisis urna. Phasellus ac ultrices odio, nec porttitor sem. Aenean posuere consectetur arcu vitae fermentum. Sed placerat, libero id vestibulum rhoncus, ipsum orci consectetur diam, sit amet sodales magna augue id nunc. In bibendum facilisis neque, vel congue ante ultricies ultricies.",
    }
    ]
    
function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("remove campgrounds");
//          // Add Campgrounds
//         data.forEach(function(seed){
//               Campground.create(seed, function(err, campground){
//                   if(err){
//                       console.log(err)
//                   } else {
//                       console.log("New Campground");
//                     //   comments added
//                     Comment.create(
//                         {
//                             text: "Wish there was internet!!",
//                             author: "Marcus"
//                         }, function(err, comment){
//                             if(err){
//                                 console.log(err);
//                             } else{
//                                 campground.comments.push(comment);
//                             campground.save();
//                             console.log("New comments added");
//                             }
//                         })
//                   }
//               });       
//         });
    });    
}

module.exports = seedDB;
