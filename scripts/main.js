function read_display_Quote() {
    db.collection("quotes").doc("tuesday")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(tuesdayDoc => {                                                               //arrow notation
           console.log("current document data: " + tuesdayDoc.data());                          //.data() returns data object
           document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote;      //using javascript to display the data on the right place
           
           //Here are other ways to access key:value data fields
           //$('#quote-goes-here').text(c.data().quote);                                       //using jquery object dot notation
           //$("#quote-goes-here").text(c.data()["quote"]);                                    //using json object indexing
      })
}
read_display_Quote()

function writePosts() {
     var postsRef = db.collection("posts");

     postsRef.add({
          code: "BBY01",
          postOwner: "Vivian",
          country: "Japan",
          name: "Kitchen Craft Eatery",
          city: "Burnaby",
          like: 98,
          openingHour: "9:00 am",
          closingHour: "9:00 pm",
          details: "Vivian goes here regularly"

     });

     postsRef.add({
          code: "BBY02",
          postOwner: "Naz",
          country: "India",
          name: "Chamber Restaurant",
          city: "Downtown Vancouver",
          like: 60,
          openingHour: "10:00 am",
          closingHour: "9:00 pm",
          details: "Naz goes here regularly"

     });

     postsRef.add({
          code: "BBY03",
          postOwner: "Chilan",
          country: "China",
          name: "Gotham Steak House",
          city: "New Westmister",
          like: 230,
          openingHour: "10:00 am",
          closingHour: "9:00 pm",
          details: "Chilan goes here regularly"

     });
}

function displayCards(collection) {
     let cardTemplate = document.getElementById("postCardTemplate");

     db.collection(collection).get()
     .then(snap => {
          var i = 1;
          snap.forEach(doc => {
               var title = doc.data().name;
               var details = doc.data().details;
               var like = doc.data().like;
               var postOwner = doc.data().postOwner;
               var country = doc.data().country;
               let newcard = cardTemplate.content.cloneNode(true);

               //update title and text and image
               newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-like').innerHTML = like;
                newcard.querySelector('.card-owner').innerHTML = postOwner;
                newcard.querySelector('.card-country').innerHTML = country;
                newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg";

               document.getElementById(collection + "-go-here").appendChild(newcard);
               i++;
          })
     })
}

displayCards("posts");