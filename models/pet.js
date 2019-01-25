var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new PetSchema object
// This is similar to a Sequelize model
var PetSchema = new Schema({

    //Pet name
    petName: {
        type: String,
        allowNull: true
    },

    //Pet Age - should be a Int not a string UPDATE
    petAge: {
        type: String,
        allowNull: true
    },

    //Pet's location
    petAddress: {
        type: String,
        allowNull: true
    },

    //Pet's vet
    petVet: {
        type: String,
        allowNull: true
    },

    //Pet's meds
    petMed: {
        type: String,
        allowNull: true
    },

    //Pet's temperament and care needs
    petCare: {
        type: String,
        allowNull: true
    },
    petPhoto: {
        type: String,
        allowNull: true
    },
    
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"} //should this be pet?? 

});

// This creates our model from the above schema, using mongoose's model method
var Pet = mongoose.model("Pet", PetSchema);

// Export the Article model
module.exports = Pet;
