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

    var PetPhoto = $("#PetPhoto").val().trim();
    var PetPhotoURL = $("#PetPhotoURL").val().trim();
    var PetName = $("#PetName").val().trim();
    // var PetBreed = $("#PetBreed").val().trim();
    var PetAge = $("#PetAge").val().trim();
    var PetLocation = $("#PetLocation").val().trim();
    var PetVet = $("#PetVet").val().trim();
    var PetCare = $("#PetCare").val().trim();
    var PetMeds = $("#PetMeds").val().trim();

    function photo(PetPhoto, PetPhotoURL){
        //pet photo is and empty string
        if(PetPhoto === ""){
            return PetPhotoURL
        } else {
            return PetPhoto
        }
    }

    var newProfile = {
        petPhoto: photo(PetPhoto, PetPhotoURL),
        petName: PetName,
        // PetBreed: PetBreed,
        petAge: PetAge,
        petAddress: PetLocation,
        petVet: PetVet,
        petCare: PetCare,
        petMed: PetMeds
    };

        console.log("New Profile " + JSON.stringify(newProfile))


        // If we're updating a post run updatePost to update a post
        // Otherwise run submitPost to create a whole new post
        $.post(`/api/add/${sessionUser._id}`, newProfile).then(function (data) {   
            var profileId = {id: data._id};
            console.log("profile id: ", profileId);
            window.location.href = "/main"
         });


        // Submits a new post and brings user to page upon completion

        function submitProfile(newProfile) {
        
        }
    }
});
