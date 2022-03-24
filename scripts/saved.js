firebase.auth().onAuthStateChanged(user => {
    if (user) {
        getBookmarks(user)
    } else {
        console.log("No user is signed in");
    }
});

function getBookmarks(user) {
    db.collection("users").doc(user.uid).get()
        .then(userDoc => {
            var bookmarks = userDoc.data().bookmarks;
            console.log(bookmarks);

            let CardTemplate = document.getElementById("CardTemplate");
            bookmarks.forEach(thisPostID => {
                console.log(thisPostID);
                db.collection("posts").where("code", "==", thisPostID).get().then(snap => {
                    size = snap.size;
                    queryData = snap.docs;
                    
                    if (size == 1) {
                        var doc = queryData[0].data();
                        var restaurantName = doc.name; //gets the name field
                        var postID = doc.code; //gets the unique ID field
                        var owner = doc.postOwner;
                        var country = doc.country; //gets the length field
                        var text = doc.details;
                        let newCard = CardTemplate.content.cloneNode(true);
                        newCard.querySelector('.card-title').innerHTML = restaurantName;
                        newCard.querySelector('.card-owner').innerHTML = owner;
                        newCard.querySelector('.card-length').innerHTML = country;
                        newCard.querySelector('.card-text').innerHTML = text;
                        newCard.querySelector('a').onclick = () => setHikeData(postID);
                        newCard.querySelector('img').src = `./images/${postID}.jpg`;
                        postCardGroup.appendChild(newCard);
                    } else {
                        console.log("Query has more than one data")
                    }

                })

            });
        })
}