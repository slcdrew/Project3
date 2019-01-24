const db = require("../models");
const profileController = require("../controllers/profileController.js");
const userController = require("../controllers/userController.js");
const petController = require("../controllers/petController.js");
const path = require("path");

module.exports = function (app) {

    let Users = [];

    app.post("/login", userController.find);
    app.post('/signup', userController.insert)

    app.post("/api/add/:userId", function (req, res) {
        console.log(req.body)
        db.Profile.create(req.body)
            .then(function (data) {
                console.log("Profilecontroller data: ", data);

                return db.User.findOneAndUpdate({_id: req.params.userId}, { $push: { Profile: data._id } }, { new: true })
            }).then(function (userProfileData) {
                res.json(userProfileData)
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.get("/api/session", function (req, res) {
        res.json(req.session.user)
    });

    app.delete("/delete/user", userController.delete);

    app.put("/update/user", userController.update);

    // Profile Controller Function Calls

    app.post("/profile", profileController.insert);

    app.get("/api/main/:userId", userController.findUserAndPets);

    app.delete("/delete/profile/:profileId", profileController.delete);

    app.put("/update/profile", profileController.update);

    // Profile Controller Function Calls

    app.post("/profile/pet", petController.insert);

    app.get("/main/pet", petController.find);

    app.delete("/delete/pet", petController.delete);

    app.put("/update/pet", petController.update);


    function checkSignIn(req, res) {
        if (req.session.email) {
            next();     //If session exists, proceed to page
        } else {
            var err = new Error("Not logged in!");
            console.log("req.session.email" , req.session.email);
            next(err);  //Error, trying to access unauthorized page!
        }
    }
    app.get('/main', checkSignIn, function (req, res) {
        res.render('main', { email: req.session.email })
    });

    app.get('/login', function (req, res) {

        if (!req.query.email || !req.query.password) {
            res.send('login failed');
        } else if (req.query.email === db.user.email || req.query.password === db.user.password) {

            res.send("login success!");
        }
        res.render('login');
    });

    app.post('/api/login', userController.find)

    app.get('/logout', function (req, res) {
        // req.session.user = {}
        req.session.user.loggedIn = false;
        req.session.user.isAdmin = false;
        // res.json(req.session.user)
        console.log("user logged out.");
        res.redirect('/index');
    });





    app.get('/profile.html', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/profile.html'));
    });



    // app.get('/logout', function (req, res) {
    //     res.sendFile(path.join(__dirname + '/../public/index.html'));
    // });

    app.get('/index.html', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });

    app.get('/add.html', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/add.html'));
    });

    app.get('/addother.html', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/addother.html'));
    });

    app.get('/aspca.html', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/aspca.html'));
    });

    app.get('/resources.html', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/resources.html'));
    });

    app.get('/main.html', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/main.html'));
    });
    /////////////////////////////////////////////////////////////////////////////////


    app.post("/getprofile", profileController.find);

    app.get("/updatedprofile/:id", function(req, res) {
        console.log("updatedprofile req.params: " , req.params.id);
    } )

    // app.get("/main/:id", profileController.find);

    app.delete("/delete/profile", profileController.delete);
    
    
    app.get("*", function (req, res) {
        res.redirect("/index.html")
    });
}