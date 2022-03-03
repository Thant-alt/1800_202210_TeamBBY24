function writeReviews() {
    //define a variable for the collection you want to create in Firestore to populate data
    var reviewsRef = db.collection("reviews");

    reviewsRef.add({
        code:"BBY01",
        RestaurantName: "O-sushi",    //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "Excellent",
        reviews: "4",
        details: "Elmo goes here regularly"
    });
    reviewsRef.add({
        code:"AM01",
        RestaurantName: "JoJo Noodles",    //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        reviews: "4",
        details: "Elmo goes here regularly"
    });
    reviewsRef.add({
        code:"NV01",
        RestaurantName: "Mount Seymoure Chicken",    //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "Terrible",
        reviews: "4",
        details: "Elmo goes here regularly"
    });
}


function displayCards(collection) {
    let cardTemplate = document.getElementById("reviewCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().RestaurantName;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("reviews");