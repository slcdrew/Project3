console.log("This is Working");
var user;
//grab id from session
$.get("/api/session").then(function (session) {
  console.log(session)
  user = session;
  $.get(`/api/main/${user._id}`).then(function (userData) {
    console.log("this is user data", userData);

    // var cardImgDiv = $(`<div class="card-image"></div>`).append(`<img src="${userData.Profile[i].photo}">`)
    // var cardImgDiv = $(`<div class="card-image"></div>`).append(`<img src="${userData.photo}">`)
    
    // var cardContentdelete = $(`<i class="material-icons small right tooltipped delete" data-position="top" id="test" data-delay="50" data-tooltip="Delete my Account" data-id="${userData._id}" >remove_circle</i>`)
    
    // var cardContentH5 = $(`<h5 class="your-name">${userData.Profile[i].first_name ? userData.Profile[i].first_name : userData.first_name} ${userData.Profile[i].last_name ? userData.Profile[i].last_name : userData.last_name}</h5>`)
    var cardDiv = $(`<div class="card horizontal"></div>`)
    var cardStackedDiv = $(`<div class="card-stacked"></div>`)
    
    var cardContentH5 = $(`<h5 class="your-name">${userData.first_name} ${userData.last_name}</h5>`)
    
    for (var i = 0; i < userData.pets.length; i++) {
      var cardContentDiv = $(`<div class="card-content"></div>`)

      var cardContentRow = $(`<div class="row"></div>`)

      var cardContentRowDiv1 = $(`<div class="col s6"></div>`)
      var cardContentRowDiv1P1 = $(`<p>Pet Age: ${userData.pets[i].petAge}</p>`)
      var cardContentRowDiv1P2 = $(`<p>Name: ${userData.pets[i].petName}</p>`)
      var cardImgDiv = $(`<img style="height:50px; width:50px; border-radius:50%;" src="${userData.pets[i].petPhoto}">`)
      var cardContentRowDiv1P3 = $(`<p>Vet: ${userData.pets[i].petVet}</p>`)

      var cardContentRowDiv2 = $(`<div class="col s6"></div>`)
      var cardContentRowDiv2P1 = $(`<p>Location: ${userData.pets[i].petAddress}</p>`)
      var cardContentRowDiv2P2 = $(`<p>Meds: ${userData.pets[i].petMed}</p>`)
      var cardContentRowDiv2P3 = $(`<p>Temperament: ${userData.pets[i].petCare}</p>`)

      var cardContentdelete = $(`<i class="material-icons small right tooltipped delete" data-position="top" id="test" data-delay="50" data-tooltip="Delete my pet" data-id="${userData.pets[i]._id}" >remove_circle</i>`)

      var cardContentUpdate = $(`<i class="material-icons small right tooltipped update" data-position="top" id="test" data-delay="50" data-tooltip="Delete my pet" data-id="${userData.pets[i]._id}" >create</i>`)
    

      var cardContentLastDiv = $(`<p class="black-text text-darken-4"><a href="/profile/${userData.pets[i]._id}"><i class="material-icons right tooltipped" data-position="top" data-delay="50" data-tooltip="more info" data-id="${userData._id}">more_horiz</i></a></p>`)

      cardContentRowDiv1.append(cardImgDiv).append(cardContentRowDiv1P2).append(cardContentRowDiv1P1)
      //.append(cardContentRowDiv1P3)

      cardContentRowDiv2.append(cardContentRowDiv2P1)
      // .append(cardContentRowDiv2P2).append(cardContentRowDiv2P3)

      cardContentRow.append(cardContentRowDiv1).append(cardContentRowDiv2)

      cardContentDiv.append(cardContentdelete).append(cardContentUpdate).append(cardContentH5).append(cardContentRow)

      cardStackedDiv.append(cardContentDiv).append(cardContentLastDiv)

      cardDiv.append(cardStackedDiv)

      $(`#cardStuff`).append(cardDiv)

    }
  })
})
//query the db Prfile for users id
//generate a card with data
function calulateAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}


$(document).on("click", ".delete", function (event) {
  event.preventDefault()
  console.log($(this));
  //get the _id of the pet off the data-id attr
  var petID = $(this).attr("data-id")
  console.log(petID);
  //make a call to our server to delete the pet and send the pet id in as a param
  $.ajax({
    url: `/delete/pet/${petID}`,
    method: "DELETE"
  }).then(function (data) {
    console.log(data);
    window.location.reload()
  })
})
$(document).on("click", ".update", function (event) {
  event.preventDefault()
  console.log($(this));
  //get the _id of the pet off the data-id attr
  var petID = $(this).attr("data-id")
  console.log(petID);
  //make a call to our server to delete the pet and send the pet id in as a param
    window.location.replace(`/updatepet/${petID}`)
})