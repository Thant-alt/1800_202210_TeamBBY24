function saveRating() {
    var foodType = document.getElementById('food_type').value;
    var restComment = document.getElementById('rest_comment').value;

    if ('input[id="1"]:checked') {
        var starRating = document.querySelector("#1").value;
    } 
    
    if ('input[id="2"]:checked') {
        var starRating = document.querySelector("#2").value;
    } 

    if ('input[id="3"]:checked') {
        var starRating = document.querySelector("#3").value;
    } 

    if ('input[id="4"]:checked') {
        var starRating = document.querySelector("#4").value;
    } 
    
    if ('input[id="4"]:checked') {
        var starRating = document.querySelector("#5").value;
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