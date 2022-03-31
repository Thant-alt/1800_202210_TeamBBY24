function saveRating() {
    var foodType = document.getElementById('food_type').value;
    var restComment = document.getElementById('rest_comment').value;
    var rate = document.getElementsByName("rating");
    var starRating;
    for (var i = 0; i < rate.length; i++) {
        if (rate[i].checked) {
            starRating = rate[i].value;
        }
    }
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            db.collection("rating").add({         //write to firestore. We are using the UID for the ID in users collection
                userID: user.uid,
                type: foodType,
                comment: restComment,
                rating: starRating,
            }).then(function () {
                console.log("New rating added to firestore");
                window.location.assign("rating-thankyou.html");        //re-direct to main.html after signup
            })
                .catch(function (error) {
                    console.log("Error adding new user: " + error);
                });

        }
    })
}