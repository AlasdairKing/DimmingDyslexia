"use strict";

function takePicture() {
	// OK, now we have to call the camera. How do we do that?
	
	// 1 Call camera and get back image.
	// 2 OCR it
	// 3 Add text to the textarea.
	console.log("1");
	var fileInput = document.getElementById("takeAPicture");
	fileInput.click();
}

// https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
function onFileSelected(event) {
	console.log("ofs");
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var thumbnail = document.getElementById("thumbnail");
  thumbnail.title = selectedFile.name;

  reader.onload = function(event) {
		var thumbnail = document.getElementById("thumbnail");
		thumbnail.src = event.target.result;
		// Image is now loaded, OCR it. 
		document.getElementById("textArea").innerText = "Processing photo, please wait...";
		getText();
		
		
  };

  reader.readAsDataURL(selectedFile);
}

async function getText() {
	const { data: { text } } = await Tesseract.recognize(document.getElementById("thumbnail"), "eng", {
	  logger: m => console.log(m)
	});
	console.log("text:" + text);
	document.getElementById("textArea").innerText = text;
}