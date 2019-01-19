var CLOUDINARY_URL = 'https://api.cloudinary.com/'  //FIX THIS
var CLOUDINARY_UPLOAD_PRESET = '';

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

		// var formatPhotoUrl = `http://res.cloudinary.com/just-in-case/image/upload/w_100,h_190,g_face,c_fill,q_auto/${res.data.public_id}.jpg`    //bring this back!!!
		console.log(formatPhotoUrl);
		imgPreview.src = formatPhotoUrl;

	}).catch(function (err) {
		console.error(err);
	});
});