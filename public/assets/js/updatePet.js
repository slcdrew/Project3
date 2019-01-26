console.log("yo updatepet page");
$("#update-profile").on("click", function (event) {
  console.log("function handle submit works");
  var petId = $(this).attr("data-id")
  console.log(petId);
  handleFormSubmit(event, petId);
});

// A function for handling what happens when the form to create a new post is submitted
function handleFormSubmit(event, petId) {
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

  function photo(PetPhoto, PetPhotoURL) {
    //pet photo is and empty string
    if (PetPhoto === "") {
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
  $.ajax({
      url: `/update/pet/${petId}`,
      method: "PUT",
      data: newProfile
    }).then(function (data) {
    console.log(data);
    window.location.href = "/main"
  });


  // Submits a new post and brings user to page upon completion

  function submitProfile(newProfile) {

  }
}

