let postID = localStorage.getItem("postID");
console.log(postID);


db.collection("posts").where("code", "==", postID)
.get()
.then(queryPost => {
    console.log("PROGRAM START HERE")

    size = queryPost.size;
    posts = queryPost.docs;

    console.log(size);
    console.log(posts);
    console.log(postID);

    if (size == 1) {
        var thisPost = posts[0].data();
        var name = thisPost.name;
        document.getElementById("RestName").innerHTML = name;
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
                        restaurantID: postID,
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