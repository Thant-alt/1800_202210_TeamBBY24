let restID = localStorage.getItem("restID");
db.collection("posts").where("code", "==", restID)
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

db.collection("reviews").where("restaurantID", "==", restID)
    .get()
    .then(queryReview => {
        size = queryReview.size;
        console.log(size);
        reviews = queryReview.docs;
        console.log(reviews);
        count=0;
        if (size > count) {
            console.log(count);
            var thisReview = reviews[count].data();
            console.log(count);
            var userName = thisReview.userName;
            console.log(userName);
            var comment = thisReview.comment;
            console.log(comment);
            var rating = thisReview.rating;
            console.log(rating);
            document.getElementById("username-goes-here").innerHTML = userName;
            document.getElementById("comment-goes-here").innerHTML = comment;
            document.getElementById("rating-goes-here").innerHTML = rating;
            count++;
            console.log(count);
        } 
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

