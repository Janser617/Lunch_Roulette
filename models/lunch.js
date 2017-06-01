var mongoose = require("mongoose");


var lunchSchema = new mongoose.Schema({
    date: String,
    time: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ]
});

module.exports = mongoose.model("Lunch", lunchSchema);