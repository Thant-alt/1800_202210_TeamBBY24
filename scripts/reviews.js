function populateCards(key, operation, value) {
    console.log(key);
    console.log(value);
    var cardTemplate = document.getElementById("postCardTemplate");
    var postCardGroup = document.getElementById("postCardGroup");
    while (postCardTemplate.firstChild) {
        postCardTemplate.removeChild(postCardTemplate.firstChild)
    }
    db.collection("reviews")
        .where(key, operation, value)
        .orderBy("starRating")
        .limit(10)
        .get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => {
                console.log(doc.data());
                createOneCard(doc, cardTemplate, postCardGroup)
            })
        })
    testHikeCard.querySelector('.read-more').href = "rating.html?restName=" + restName + "&id=" + restID;
}

function createOneCard(doc, cardTemplate, cardDiv) {
    var starRating = doc.data().rating;
    var resComment = doc.data().comment;
    let testPostCard = cardTemplate.content.cloneNode(true);
    //update title and text and image
    testPostCard.querySelector('.card-title').innerHTML = starRating;
    testPostCard.querySelector('.card-text').innerHTML = resComment;
}