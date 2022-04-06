let postID = localStorage.getItem("postID");
console.log("postId" + postID);
db.collection("posts")
    .doc(postID)
    .onSnapshot(function (postDoc) {
        var restName = postDoc.data().name;
        document.getElementById("RestName").innerHTML = restName;
    })




var postCardTemplate = document.getElementById("postCardTemplate");
var postCardGroup = document.getElementById("postCardGroup");
var commentPostID = localStorage.getItem("commentPostID");
console.log("CommentPostID: " + commentPostID);
db.collection("reviews").where("commentPostID", "==", commentPostID)
    .get()
    .then(queryReview => {
        queryReview.forEach(doc => {
            var userName = doc.data().userName;
            console.log(userName);
            var comment = doc.data().comment;
            console.log(comment);
            var rating = doc.data().rating;
            console.log(rating);
            let postCard = postCardTemplate.content.cloneNode(true);
            postCard.querySelector('.card-title').innerHTML = userName;
            postCard.querySelector('.card-length').innerHTML = rating + " stars";
            postCard.querySelector('.card-text').innerHTML = comment;
            postCardGroup.appendChild(postCard);
        })
    })



