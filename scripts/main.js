var currentUser;
var currentUserRegion;
firebase.auth().onAuthStateChanged(user => {
     if (user) {
          console.log(user.uid);
          currentUser = db.collection("users").doc(user.uid);
          console.log(currentUser);
          insertName();
          currentUser.get().then(function (doc) {
               console.log(doc.data());
               currentUserRegion = doc.data().region;
               console.log(currentUserRegion);
               populateCards("country", "==", currentUserRegion);
          })
     } else {
          console.log("No user is singned in");
          window.location.href = "login.html";
     }
});

function insertName() {
     currentUser.get().then(userDoc => {
          //get the user name
          var user_Name = userDoc.data().name;
          console.log(user_Name);
          $("#name-goes-here").text(user_Name);

     })
}

function writePosts() {
     var postsRef = db.collection("posts");

     postsRef.add({
          code: "BBY01",
          postOwner: "Vivian",
          country: "Myanmar",
          name: "Life of Pie",
          city: "Burnaby",
          openingHour: "9:00 am",
          closingHour: "9:00 pm",
          details: "You are the pumpkin to my pie. Sweet as pumpkin pie.",
          last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 26, 2022"))

     });

     postsRef.add({
          code: "BBY02",
          postOwner: "Naz",
          country: "Iran",
          name: "Lord of the Wings",
          city: "Downtown Vancouver",
          openingHour: "10:00 am",
          closingHour: "10:00 pm",
          details: "Where a bucket full of wings feels like home.",
          last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
     });

     postsRef.add({
          code: "BBY03",
          postOwner: "Chi Lan",
          country: "Vietnam",
          name: "Tequila Mockingbird",
          city: "Victoria",
          openingHour: "11:00 am",
          closingHour: "2:00 am",
          details: "When life gives you lemons, grab salt & tequila!",
          last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2022"))
     });

     postsRef.add({
          code: "BBY04",
          postOwner: "Tushar",
          country: "India",
          name: "Pita Pan",
          city: "Richmond",
          openingHour: "8:00 am",
          closingHour: "10:00 pm",
          details: "You are the hummus to my bread & breath to my life.",
          last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 30, 2022"))
     });

     postsRef.add({
          code: "BBY05",
          postOwner: "test-user1",
          country: "Japan",
          name: "Frying Nemo",
          city: "South Vancouver",
          openingHour: "10:00 am",
          closingHour: "10:00 pm",
          details: "Time fries whenever I'm with you.",
          last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 21, 2022"))
     });

     postsRef.add({
          code: "BBY06",
          postOwner: "test-user2",
          country: "China",
          name: "The Codfather",
          city: "West End",
          openingHour: "10:00 am",
          closingHour: "10:00 pm",
          details: "Thank cod, it's fryday, the best day of the week",
          last_updated: firebase.firestore.Timestamp.fromDate(new Date("February 21, 2022"))
     });

     postsRef.add({
          code: "BBY07",
          postOwner: "test-user3",
          country: "Singapore",
          name: "Planet of Crepes",
          city: "Hastings",
          openingHour: "10:00 am",
          closingHour: "10:00 pm",
          details: "Holy Crepe, it's flippin's pancake day.",
          last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 11, 2022"))
     });

     postsRef.add({
          code: "BBY08",
          postOwner: "test-user4",
          country: "South Korea",
          name: "Happy Grillmore",
          city: "Fairview",
          openingHour: "10:00 am",
          closingHour: "10:00 pm",
          details: "BBQ cause you can't live a full life on an empty stomach.",
          last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 14, 2022"))
     });
}



function populateCards(key, operation, value) {
     console.log(key);
     console.log(value);
     var cardTemplate = document.getElementById("postCardTemplate");
     var postCardGroup = document.getElementById("postCardGroup");
     while (postCardTemplate.firstChild) {
          postCardTemplate.removeChild(postCardTemplate.firstChild)
     }
     db.collection("posts")
          .where(key, operation, value)
          .orderBy("name")
          .limit(10)
          .get()
          .then(snap => {
               var i = 1;
               snap.forEach(doc => {
                    console.log(doc.data());
                    createOneCard(doc, cardTemplate, postCardGroup)
               })
          })
}

async function createOneCard(doc, cardTemplate, cardDiv) {


     console.log(doc.data().name);
     var postID = doc.id;
     localStorage.setItem("postID", postID);
     console.log(postID);
     var restID = doc.data().code;
     localStorage.setItem("restID", restID);
     var title = doc.data().name;
     localStorage.setItem("restID", restID);
     var postScore = doc.data().scores;
     var details = doc.data().details;
     var postOwner = doc.data().postOwner;
     var country = doc.data().country;
     var restIMG = doc.data().restaurantURL
     let testPostCard = cardTemplate.content.cloneNode(true);
     //update title and text and image
     testPostCard.querySelector('.card-title').innerHTML = title;
     testPostCard.querySelector('.card-text').innerHTML = details;
     testPostCard.querySelector('.card-owner').innerHTML = postOwner;
     testPostCard.querySelector('.card-country').innerHTML = country;
     // //this line sets the id attribute for the <i> tag in the format of "save-postID" 
     // //so later we know which hike to bookmark based on which post was clicked
     testPostCard.querySelector('.save-button').id = 'save-' + postID;
     // // this line will call a function to save the hikes to the user's document             
     testPostCard.querySelector('.save-button').onclick = () => saveBookmark(postID);
     // //this is the line added so that it makes the icon clickable and call another function
     testPostCard.querySelector('.likeCard').onclick = () => addLikes(postID);
     testPostCard.querySelector(".scores-goes-here").innerHTML = postScore;
     testPostCard.querySelector(".scores-goes-here").id = postID + "-score";
     testPostCard.querySelector('.card-image').src = restIMG;
     //testPostCard.querySelector('.card-image').src = `./images/${restID}.jpeg`;
     cardDiv.appendChild(testPostCard);
}


function displayBySearch() {
     value = document.getElementById("searchvalue").value;
     alert("search clicked " + value);
     if (value) {
          console.log(value);
          populateCards("name", "==", value);
     } else
          populateCards("name", "!=", value);
}


async function addLikes(postID) {
     console.log(postID + "-score");
     
     await db.collection("posts").doc(postID).update({
          scores: firebase.firestore.FieldValue.increment(1)
     });
     db.collection("posts")
          .doc(postID)
          .get()
          .then( post => {
               document.getElementById(postID + "-score").innerHTML = post.data().scores;
          });
}

function saveBookmark(postID) {

     currentUser.set({
          bookmarks: firebase.firestore.FieldValue.arrayUnion(postID)

     }, {
          merge: true
     })
          .then(function () {
               console.log("Post is saved for: " + currentUser);
               var iconID = 'save-' + postID;
               document.getElementById(iconID).innerText = 'bookmark';
          });

}