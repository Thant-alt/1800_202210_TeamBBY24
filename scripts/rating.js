function saveRating() {
    var foodType = document.getElementById('food_type').value;
    var restComment = document.getElementById('rest_comment').value;

    if ('input[id="1"]:checked') {
        var starRating = document.getElementById('1').value;
        console.log(starRating);
    } 
    
    if ('input[id="2"]:checked') {
        var starRating = document.getElementById('2').value;
        console.log(starRating);
    } 

    if ('input[id="3"]:checked') {
        var starRating = document.getElementById('3').value;
        console.log(starRating);
    } 

    if ('input[id="4"]:checked') {
        var starRating = document.getElementById('4').value;
        console.log(starRating);
    } 
    
    if ('input[id="5"]:checked') {
        var starRating = document.getElementById('5').value;
        console.log(starRating);
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