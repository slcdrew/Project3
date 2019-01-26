const Pet = require('../models/pet');

module.exports = {
    find: function(req, res) {
        Pet.find().then(function(data) {
        res.json(data);
        }).catch(function(err) {
        res.json(err);
        });
    },

    insert: function(req, res) {
        console.log(req.body)
        Pet.create(req.body).then(function(data) {
        res.json(data);
        }).catch(function(err) {
        res.json(err);
        });
    },

    delete: function(req, res) {
        Pet.remove({
        _id: req.params.id
        }).then(function(data) {
            console.log("this is delete route pet data ", data);
        res.json(data);
        }).catch(function(err) {
        res.json(err);
        });
    },

    update: function(req, res) {
        console.log(req.body);
        Pet.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: req.body 
            },
            {
                new: true
            }
        ).then(function(data) {
        res.json(data);
        }).catch(function(err) {
        res.json(err);
        });
    }
};