let postID = localStorage.getItem("postID");
console.log(postID);
db.collection("posts")
    .doc(postID)
    .onSnapshot(function (postDoc) {
        var restName = postDoc.data().name;
        document.getElementById("RestName").innerHTML = restName;
        var commentPostID = postID;
        console.log(commentPostID);
        localStorage.setItem("commentPostID", commentPostID);
    })

let userName = localStorage.getItem("userName");
db.collection("users").where("name", "==", userName)
    .get()

let userRegion = localStorage.getItem("userRegion");
db.collection("users").where("region", "==", userRegion)
    .get()

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
            currentUser.get()
                .then(userDoc => {
                    db.collection("reviews").add({         //write to firestore. We are using the UID for the ID in users collection
                        userID: user.uid,
                        comment: restComment,
                        rating: starRating,
                        commentPostID: postID,
                        userName: userName,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
