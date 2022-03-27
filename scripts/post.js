
function showUploadedPicture(){
    const image_input = document.querySelector("#image_input");
    const image = document.getElementById("mypic-goes-here");

    image_input.addEventListener("change" , function(e){
        console.log(image_input.value);
        
        //the change event returns a file "e.target.files[0]"
        var blob = URL.createObjectURL(e.target.files[0]);

        //change the DOM img element source to point to this file
        image.src = blob;    //assign the "src" property of the "img" tag
    })
}
showUploadedPicture();

function editRestInfo() {
    //Enable the form fields
    document.getElementById('restaurantInfoFields').disabled = false;
 }
 
 editRestInfo();



 function saveRestaurantInfo() {
    var restaurantName = document.getElementById('rest_name').value;       
    var foodType = document.getElementById('food_type').value;     
    var restComment = document.getElementById('rest_comment').value;
    var customerService = document.querySelector('input[name="customer-service"]:checked').value;
    var priceRange = document.querySelector('input[name="price-range"]:checked').value;

    
    

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            db.collection("restaurant").add({         //write to firestore. We are using the UID for the ID in users collection
                userID: user.uid,
                name: restaurantName,
                type: foodType,
                comment: restComment,
                custom: customerService,
                price: priceRange
            }).then(function () {
                console.log("New restaurant added to firestore");
                window.location.assign("main.html");        //re-direct to main.html after signup
            })
            .catch(function (error) {
                console.log("Error adding new user: " + error);
            });
 
        }
    })
}

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