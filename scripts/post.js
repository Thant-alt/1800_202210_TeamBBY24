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

            var storageRef = firebase.storage().ref("images/" + user.uid + ".jpg"); // Get reference
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
    var foodType = document.getElementById('food_type').value;
    var restComment = document.getElementById('rest_comment').value;
    var customerService = document.querySelector('input[name="customer-service"]:checked').value;
    var priceRange = document.querySelector('input[name="price-range"]:checked').value;
    var imgsrc = document.getElementById("mypic-goes-here").dataset.url;



    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            db.collection("restaurant").add({         //write to firestore. We are using the UID for the ID in users collection
                userID: user.uid,
                name: restaurantName,
                type: foodType,
                comment: restComment,
                custom: customerService,
                price: priceRange,
                restaurantURL: imgsrc
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



