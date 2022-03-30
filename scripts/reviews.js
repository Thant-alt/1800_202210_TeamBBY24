function populateCardsDynamically(user) {

    db.collection("users").doc(user.uid).get()
    .then(userDoc => {
         var name = userDoc.data().name;
         console.log(name);
    

    let cardTemplate = document.getElementById("postCardTemplate");
    let postCardTemplate = document.getElementById("postCardGroup");

    db.collection("posts")
         .where("country", "==", region)
         .orderBy("name")
         .limit(10)
         .get()
         .then(snap => {
              var i = 1;
              snap.forEach(doc => {
                   var postID = doc.data().code;
                   var title = doc.data().name;
                   var postScore = doc.data().scores;
                   var details = doc.data().details;

                   var postOwner = doc.data().postOwner;
                   var country = doc.data().country;

                   let testPostCard = cardTemplate.content.cloneNode(true);

                   //update title and text and image
                   testPostCard.querySelector('.card-title').innerHTML = title;
                   testPostCard.querySelector('.card-text').innerHTML = details;
                   testPostCard.querySelector('.card-owner').innerHTML = postOwner;
                   testPostCard.querySelector('.card-country').innerHTML = country;
                   //this line sets the id attribute for the <i> tag in the format of "save-postID" 
                   //so later we know which hike to bookmark based on which post was clicked
                   testPostCard.querySelector('.save-button').id = 'save-' + postID;
                   // this line will call a function to save the hikes to the user's document             
                   testPostCard.querySelector('.save-button').onclick = () => saveBookmark(postID);
                   //this is the line added so that it makes the icon clickable and call another function
                   testPostCard.querySelector('.likeCard').onclick = () => addLikes(postID);
                   testPostCard.querySelector(".scores-goes-here").innerHTML = postScore;
                   testPostCard.querySelector('.card-image').src = `./images/${postID}.jpg`;

                   postCardGroup.appendChild(testPostCard);
              })
         })

    })
}
//populateCardsDynamically()