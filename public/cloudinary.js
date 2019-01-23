var CLOUDINARY_URL = 'http://res.cloudinary.com/dzphyexnz'  //is this right?
var CLOUDINARY_UPLOAD_PRESET = '';  //figure this out

var imgPreview = document.getElementById('photoPreview');
var fileUpload = document.getElementById('photo');

fileUpload.addEventListener('change', function (event) {
	var file = event.target.files[0];
	console.log(file)

	// CLOUDINARY_URL + file;
	
	var formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

	axios({
		url: CLOUDINARY_URL,
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: formData
	}).then(function (res) {
		console.log(res);
		console.log(formatPhotoUrl);
		imgPreview.src = formatPhotoUrl;

	}).catch(function (err) {
		console.error(err);
	});
});
