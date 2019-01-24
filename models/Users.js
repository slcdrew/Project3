var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({

  //User First Name
  first_name: {
    type: String,
    required: true
  },

  //User Last Name
  last_name: {
    type: String,
    required: true
  },

  //User Email
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

  password: {
    type: String,
    required: true
  },

  address: {
      type: String,
      allowNull: false
  },

  // User info: Phone Number
  phone: {
    type: String,
    allowNull: false
  },

  pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet"
      }
    ]

  
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
