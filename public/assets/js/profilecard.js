//Would like to gather more info abotu the user for their profiles.  This is future concept


var user
//grab id from session
$.get("/api/session").then(function (session) {
  console.log(session)
  user = session;
  $.get(`/api/profile/:userData.Profile._id`).then(function (userData) {
    
    
      var cardDiv = $(`<div class="card horizontal"></div>`)
      var cardImgDiv = $(`<div class="card-image"></div>`).append(`<img src="${userData.Profile.photo}">`)
      var cardStackedDiv = $(`<div class="card-stacked"></div>`)
  
      var cardContentDiv = $(`<div class="card-content"></div>`)
      var cardContentdelete = $('<i class="material-icons small right tooltipped" data-position="top" data-delay="50" data-tooltip="Delete my Account" >remove_circle</i>')
      var cardContentH5 = $(`<h5 class="your-name">${userData.Profile.first_name ? userData.Profile.first_name : userData.first_name} ${userData.Profile.last_name ? userData.Profile.last_name : userData.last_name}</h5>`)
      var cardContentRow = $(`<div class="row"></div>`)
  
      var cardContentRowDiv1 = $(`<div class="col s6"></div>`)
      var cardContentRowDiv1P1 = $(`<p>DOB: ${userData.Profile.birthdate}</p>`)
      var cardContentRowDiv1P2 = $(`<p>Height: ${userData.Profile.height}</p>`)
      var cardContentRowDiv1P3 = $(`<p>Hair: ${userData.Profile.hair}</p>`)
  
      var cardContentRowDiv2 = $(`<div class="col s6"></div>`)
      var cardContentRowDiv2P1 = $(`<p>AGE: ${calulateAge(userData.Profile.birthdate)}</p>`)
      var cardContentRowDiv2P2 = $(`<p>Weight: ${userData.Profile.weight}</p>`)
      var cardContentRowDiv2P3 = $(`<p>Eye: ${userData.Profile.eyes}</p>`)
      var cardContentRowDiv2P4 = $(`<p>Relationship: ${userData.Profile.relationship ? userData.Profile.relationship : "Account Owner"}</p>`)
  
      var cardContentLastDiv = $(`<p class="black-text text-darken-4"><a href="profile.html"><i class="material-icons right tooltipped" data-position="top" data-delay="50" data-tooltip="more info">more_horiz</i></a></p>`)
  
      cardContentRowDiv1.append(cardContentRowDiv1P1).append(cardContentRowDiv1P2).append(cardContentRowDiv1P3)
      cardContentRowDiv2.append(cardContentRowDiv2P1).append(cardContentRowDiv2P2).append(cardContentRowDiv2P3).append(cardContentRowDiv2P4)
  
      cardContentRow.append(cardContentRowDiv1).append(cardContentRowDiv2)
  
      cardContentDiv.append(cardContentdelete).append(cardContentH5).append(cardContentRow)
      cardStackedDiv.append(cardContentDiv).append(cardContentLastDiv)
  
      cardDiv.append(cardImgDiv).append(cardStackedDiv)
      $(`#cardStuff`).append(cardDiv)
  
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
//sudo request made to backend for user

//UGHHHHHH
