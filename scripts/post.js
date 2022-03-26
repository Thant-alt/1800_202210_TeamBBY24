
const image_input = document.querySelector("#image_input");
var uploaded_image = "";

image_input.addEventListener("change" , function(){
    console.log(image_input.value);
    const reader = new FileReader();
    reader.addEventListener("load", ()=> {
        uploaded_image = reader.result;
        document.querySelector("#post_image").style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(this.files[0]);
})

// // Create a root reference
// var storageRef = db.ref();

// // Create a reference to 'mountains.jpg'
// var postRef = storageRef.child('BBY03.jpg');

// // Create a reference to 'images/mountains.jpg'
// var postImagesRef = storageRef.child('images/BBY03.jpg');

// // While the file names are the same, the references point to different files
// postRef.name === postImagesRef.name;           // true
// postRef.fullPath === postImagesRef.fullPath;   // false 

// function uploadBlob(file) {
//     const ref = firebase.storage().ref().child('BBY03.jpg');
  
//     // [START storage_upload_blob]
//     // 'file' comes from the Blob or File API
//     ref.put(file).then((snapshot) => {
//       console.log('Uploaded a blob or file!');
//     });
//     // [END storage_upload_blob]
//   }