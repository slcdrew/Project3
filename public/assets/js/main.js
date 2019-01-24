console.log("This is Working");
var user;
//grab id from session
$.get("/api/session").then(function (session) {
  console.log(session)
  user = session;
  $.get(`/api/main/${user._id}`).then(function (userData) {
    console.log("this is user data", userData);

    // for (var i = 0; i < userData.Profile.length; i++) {
      var cardDiv = $(`<div class="card horizontal"></div>`)
      var cardImgDiv = $(`<div class="card-image"></div>`).append(`<img src="${userData.Profile[i].photo}">`)
      var cardStackedDiv = $(`<div class="card-stacked"></div>`)

      var cardContentDiv = $(`<div class="card-content"></div>`)

      var cardContentdelete = $(`<i class="material-icons small right tooltipped delete" data-position="top" id="test" data-delay="50" data-tooltip="Delete my Account" data-id="${userData.Profile[i]._id}" >remove_circle</i>`)

      var cardContentH5 = $(`<h5 class="your-name">${userData.Profile[i].first_name ? userData.Profile[i].first_name : userData.first_name} ${userData.Profile[i].last_name ? userData.Profile[i].last_name : userData.last_name}</h5>`)

      var cardContentRow = $(`<div class="row"></div>`)

      var cardContentRowDiv1 = $(`<div class="col s6"></div>`)
      var cardContentRowDiv1P1 = $(`<p>Pet Age: ${userData.Profile.PetAge}</p>`)
      var cardContentRowDiv1P2 = $(`<p>Breed: ${userData.Profile.PetBreed}</p>`)
      var cardContentRowDiv1P3 = $(`<p>Vet: ${userData.Profile.PetVet}</p>`)

      var cardContentRowDiv2 = $(`<div class="col s6"></div>`)
      var cardContentRowDiv2P1 = $(`<p>Location: ${userData.Profile.PetLocation}</p>`)
      var cardContentRowDiv2P2 = $(`<p>Meds: ${userData.Profile.PetMeds}</p>`)
      var cardContentRowDiv2P3 = $(`<p>Temperament: ${userData.Profile.PetCare}</p>
      
      userData.Profile.relationship : "Pet Owner"}</p>`)

      var cardContentLastDiv = $(`<p class="black-text text-darken-4"><a href="profile.html"><i class="material-icons right tooltipped" data-position="top" data-delay="50" data-tooltip="more info" data-id="${userData.Profile[i]._id}">more_horiz</i></a></p>`)

      cardContentRowDiv1.append(cardContentRowDiv1P1).append(cardContentRowDiv1P2).append(cardContentRowDiv1P3)
      cardContentRowDiv2.append(cardContentRowDiv2P1).append(cardContentRowDiv2P2).append(cardContentRowDiv2P3).append(cardContentRowDiv2P4)

      cardContentRow.append(cardContentRowDiv1).append(cardContentRowDiv2)

      cardContentDiv.append(cardContentdelete).append(cardContentH5).append(cardContentRow)
      cardStackedDiv.append(cardContentDiv).append(cardContentLastDiv)

      cardDiv.append(cardImgDiv).append(cardStackedDiv)
      $(`#cardStuff`).append(cardDiv)

    // }
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