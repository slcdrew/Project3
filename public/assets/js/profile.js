$(document).ready(function () {

    // POST route for saving a new post
    var sessionUser = {}
    $.get('/api/session', function(res){
        sessionUser = res;
        console.log(sessionUser, 'this is session user');
    })

    // Adding an event listener for when the form is submitted
    $("#submit-profile").on("click", function (event) {
        console.log("function handle submit works");
        handleFormSubmit(event);
    });

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        console.log("handle submit");
        event.preventDefault();

    var birthdate = $("#birthdate").val().trim();
    var address = $("#address").val().trim();
    var PetName = $("#PetName").val().trim();
    var relationship = $("#relationship").val().trim();
    var vet = $("#vet").val().trim();
    var temperament = $("#temperament").val().trim();

    var newProfile = {
      PetName: PetName,
      relationship: relationship,
      photo: photo,
      birthdate: birthdate,
      address: address,
      vet: vet,
      temperament: temperament
    };

        console.log("New Profile " + JSON.stringify(newProfile))


        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        $.post(`/api/add/${sessionUser.currentUser.id}`, newProfile).then(function (data) {
        
                    var profileId = {id: data._id};
                    console.log("profile id: ", profileId);
                    window.location.href = "/main.html"
                    // $.post("/getprofile", profileId).then(function (res) {
                    //     console.log("Hello");
                    //     // res.redirect(307, "profile");
                    //     window.location.href = "localhost:3000/profile";
         });


        // Submits a new post and brings user to page upon completion

        function submitProfile(newProfile) {
        
        }
    }
});
