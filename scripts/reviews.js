let postID = localStorage.getItem("postID");
console.log(postID);
db.collection("posts")
    .doc(postID)
    .onSnapshot(function (postDoc) {
        var restName = postDoc.data().name;
        document.getElementById("RestName").innerHTML = restName;
    })

let commentPostID = localStorage.getItem("commentPostID");
db.collection("reviews").where("commentPostID", "==", commentPostID)
.get()
.then(queryReview => {
    size = queryReview.size;
    console.log(size);
    reviews = queryReview.docs;
    console.log(reviews);
    for (let i = 0; size > i; i++) {
        console.log(i);
        var thisReview = reviews[i].data();
        console.log(i);
        var userName = thisReview.userName;
        console.log(userName);
        var comment = thisReview.comment;
        console.log(comment);
        var rating = thisReview.rating;
        console.log(rating);
        document.getElementById("username-goes-here").innerHTML = userName;
        document.getElementById("comment-goes-here").innerHTML = comment;
        document.getElementById("rating-goes-here").innerHTML = rating;
        console.log(i);    
    } 
})
.catch((error) => {
    console.log("Error getting documents: ", error);
});