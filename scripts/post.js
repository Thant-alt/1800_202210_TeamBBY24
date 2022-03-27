
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

function populateRestaurant() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var restName = userDoc.data().name;
                    var foodType = userDoc.data().type;
                    var restImage = userDoc.data().img;
                    var foodLevel = userDoc.data().level;
                    var packLevel = userDoc.data().plevel;
                    var restComment = userDoc.data().comment;
                    var customerService = userDoc.data().service;
                    var priceRange = userDoc.data().comment;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userBirthday != null) {
                        document.getElementById("birthdayInput").value = userBirthday;
                    }
                    if (userEmail != null) {
                        document.getElementById("cityInput").value = userEmail;
                    }
                    if (userRegion != null) {
                        document.getElementById("cityInput").value = userRegion;
                    }
                    if (userGender != null) {
                        document.getElementById("cityInput").value = userGender;
                    }
                    if (userPhoneNumber != null) {
                        document.getElementById("cityInput").value = userPhoneNumber;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateRestaurant();

function editRestInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }
 
 editRestInfo();

 function saveUserInfo() {
    userName = document.getElementById('nameInput').value;       
    userBirthday = document.getElementById('birthdayInput').value;     
    userEmail = document.getElementById('emailInput').value;
    userRegion = document.getElementById('regionInput').value;
    userGender = document.getElementById('genderInput').value;
    userPhoneNumber = document.getElementById('phoneNumberInput').value;

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            //write/update the database 
            currentUser.update({
                name: userName,
                birthDay: userBirthday,
                email: userEmail,
                region: userRegion,
                gender: userGender,
                phoneNumber: userPhoneNumber
            })
            .then(() => {
                console.log("Document successfully updated!");
                document.getElementById('personalInfoFields').disabled = true;
                
                    window.location.assign("main.html");
            })
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