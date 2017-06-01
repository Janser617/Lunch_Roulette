var mongoose = require("mongoose");


var bookingSchema = new mongoose.Schema({
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Booking", bookingSchema);