var mongoose = require("mongoose");
var Lunch = require("./models/lunch.js");
var Bookings = require("./models/booking");

// var data =[
//     {
//         name: "By the Lake",
//         image: "https://source.unsplash.com/i9FLJwYhVQs",
//         description: "this is a nice campground that is situated by a lake"
//     },
//     {
//         name: "In the Woods",
//         image: "https://source.unsplash.com/2DH-qMX6M4E",
//         description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
//     },
//     {
//         name: "In the Dark",
//         image: "https://source.unsplash.com/rRljZzjNQAA",
//         description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
//     },
//     {
//         name: "Dry Desert",
//         image: "https://source.unsplash.com/B9z9TjfIw3I",
//         description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
//     },
//     {
//         name: "Hidden Valley",
//         image: "https://source.unsplash.com/waTo4DNZ4zE",
//         description: "sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua"
//     },
//     {
//         name: "Climbing the Hill",
//         image: "https://source.unsplash.com/mzZVGFfMOkA",
//         description: "sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua"
//     },
//     {
//         name: "Rock 'n' Camp",
//         image: "https://source.unsplash.com/K9olx8OF36A",
//         description: "sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua"
//     },
// ];

// function seedDB(){
//     //remove all campgrounds
//     Campground.remove({}, function(err) {
//         if(err){
//             console.log(err);
//         } else {
//             console.log("flushed database");
//             //add campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comments.create(
//                             {
//                                 text:"This place is great, but no internet", 
//                                 author:"Homer"
                                
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     console.log("Added a comment");
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                 }
                                
//                             });
//                     }
//                 });
//             });
//         }
//     });
// }

//module.exports = seedDB;