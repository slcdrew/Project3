var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
var ProfileSchema = new Schema({

    // User info: First Name
    first_name: {
        type: String,
        required: false
    },
    // User info: Last Name
    last_name: {
        type: String,
        required: false
    },
    
    //User info: Email Address
    email: {
        type: String,
        required: false
    },

    // User info: Address
    address: {
        type: String,
        allowNull: false
    },

    // User info: Phone Number
    phone: {
        type: String,
        allowNull: false
    },

    //
    
    User: {type: mongoose.Schema.Types.ObjectId, ref: "User"}

});

// This creates our model from the above schema, using mongoose's model method
var Profile = mongoose.model("Profile", ProfileSchema);

// Export the Article model
module.exports = Profile;
