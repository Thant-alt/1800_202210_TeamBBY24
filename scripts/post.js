function uploadedPicture() {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
        const image_input = document.querySelector("#image_input");
        var image = document.getElementById("mypic-goes-here");

        image_input.addEventListener("change", function (e) {
            console.log(image_input.value);

            //the change event returns a file "e.target.files[0]"
            var blob = URL.createObjectURL(e.target.files[0]);

            //change the DOM img element source to point to this file
            image.src = blob;    //assign the "src" property of the "img" tag

            var storageRef = firebase.storage().ref("images/" + new Date().getTime() + ".jpg"); // Get reference
            // Upload picked file to cloud storage
            storageRef.put(e.target.files[0])
                .then(function () {
                    storageRef.getDownloadURL()
                        .then(function (url) { // Get URL of the uploaded file
                            console.log(url); // Save the URL into users collection
                            // db.collection("restaurant").doc(user.uid).update({
                            //     "restaurant-pic": url
                            // })
                                // .then(function () {
                                //     console.log('Added Pic URL to Firestore.');
                                // })
                            image.dataset.url=url;
                        })
                })
        })
    } else {
        console.log("No user is singned in");
        window.location.href = "login.html";
    }
});
}
uploadedPicture();

function editRestInfo() {
    //Enable the form fields
    document.getElementById('restaurantInfoFields').disabled = false;
}

editRestInfo();


function saveRestaurantInfo() {
    var restaurantName = document.getElementById('rest_name').value;
    var foodCountry = document.getElementById('food_country').value;
    var foodCity = document.getElementById('food_city').value;
    var restComment = document.getElementById('rest_comment').value;
    var openingHour = document.getElementById('opening_time').value;
    var closingHour = document.getElementById('closing_time').value;
    var imgsrc = document.getElementById("mypic-goes-here").dataset.url;



    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            db.collection("posts").add({         //write to firestore. We are using the UID for the ID in users collection
                postOwner: user.displayName,
                name: restaurantName,
                country: foodCountry,
                city: foodCity,
                details: restComment,
                openingHour: openingHour,
                closingHour: closingHour,
                restaurantURL: imgsrc,
                last_updated: firebase.firestore.Timestamp.fromDate(new Date())
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



