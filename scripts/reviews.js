let postID = localStorage.getItem("postID");
db.collection("posts").where("code", "==", postID)
    .get()
    .then(queryPost => {
        size = queryPost.size;
        posts = queryPost.docs;
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



db.collection("reviews").where("restaurantID", "==", postID)
    .get()
    .then(queryReview => {
        size = queryReview.size;
        reviews = queryReview.docs;
        console.log(reviews);
        if (size > 0) {
            var thisReview = reviews[0].data();
            var userName = thisReview.userName;
            console.log(userName);
            var comment = thisReview.comment;
            console.log(comment);
            var rating = thisReview.rating;
            console.log(rating);
            document.getElementById("username-goes-here").innerHTML = userName;
            document.getElementById("comment-goes-here").innerHTML = comment;
            document.getElementById("rating-goes-here").innerHTML = rating;
        } 
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

