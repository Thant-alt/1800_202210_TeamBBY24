let postID = localStorage.getItem("postID");

db.collection("posts").where("code", "==", postID)
    .get()
    .then(queryRestaurant => {
        //see how many results you have got from the query
        size = queryRestaurant.size;
        // get the documents of query
        Restaurants = queryRestaurant.docs;

        // We want to have one document per hike, so if the the result of 
        //the query is more than one, we can check it right now and clean the DB if needed.
        if (size = 1) {
            var thisRestaurant = Restaurants[0].data();
            title = thisRestaurant.name;
            document.getElementById("RestName").innerHTML = title;
        } else {
            console.log("Query has more than one data")
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

function saveRating() {
    console.log("in")
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
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("reviews").add({         //write to firestore. We are using the UID for the ID in users collection
                        userID: user.uid,
                        comment: restComment,
                        rating: starRating,
                    }).then(function () {
                        console.log("New rating added to firestore");
                        window.location.assign("rating-thankyou.html");
                    })
                        .catch(function (error) {
                            console.log("Error adding new user: " + error);
                        })
                })
        }
    });
}