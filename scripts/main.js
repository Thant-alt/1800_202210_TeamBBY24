
// this the firebase functions setup code
const functions = require('firebase-functions');
const admin = require('firebase-admin');
let Promise = require('promise');
const cors = require('cors')({ origin: true });
const auth = require('basic-auth');
const request = require('request');
const algoliasearch = require('algoliasearch');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
// listen for creating a piece of equipment in Firestore
exports.addEquipmentToAlgolia = functions.firestore.document('equipment/{document}')
.onCreate(event => {
console.log('ADD EQUIP EVENT IS', event);
const active = event.data.data().active === true ? "true" : "false"
const data = {
  objectID: event.params.document,
  description: event.data.data().description, 
  category: event.data.data().category,
  category_id: event.data.data().category_id,
  flat_fee: event.data.data().flat_fee,
  group: event.data.data().group,
  hourly: event.data.data().hourly,
  active: active,
  daily: event.data.data().daily,
  weekly: event.data.data().weekly,
  monthly: event.data.data().monthly,
  bulkItem: event.data.data().bulkItem 
 };
return addToAlgolia(data, 'equipment')
 .then(res => console.log('SUCCESS ALGOLIA equipment ADD', res))
 .catch(err => console.log('ERROR ALGOLIA equipment ADD', err));
});
// listen for editing a piece of equipment in Firestore
exports.editEquipmentToAlgolia = functions.firestore.document('equipment/{document}')
.onUpdate(event => {
console.log('edit event', event.data.data())
const active = event.data.data().active === true ? "true" : "false"
const data = {
  objectID: event.params.document,
  description: event.data.data().description, 
  category: event.data.data().category,
  category_id: event.data.data().category_id,
  flat_fee: event.data.data().flat_fee,
  group: event.data.data().group,
  hourly: event.data.data().hourly,
  active: active,
  bundleItem: event.data.data().bundleItem,
  daily: event.data.data().daily,
  weekly: event.data.data().weekly,
  monthly: event.data.data().monthly,
  bulkItem: event.data.data().bulkItem 
 };
console.log('DATA in is', data)
return editToAlgolia(data, 'equipment')
 .then(res => console.log('SUCCESS ALGOLIA EQUIPMENT EDIT', res))
 .catch(err => console.log('ERROR ALGOLIA EQUIPMENT EDIT', err));
});
// listen for a delete of a piece of equipment in Firestore
exports.removeEquipmentFromAlgolia = functions.firestore.document('equipment/{document}')
.onDelete(event => {
 const objectID = event.params.document;
 return removeFromAlgolia(objectID, 'equipment')
 .then(res => console.log('SUCCESS ALGOLIA equipment ADD', res))
 .catch(err => console.log('ERROR ALGOLIA equipment ADD', err));
})
// helper functions for create, edit and delete in Firestore to replicate this in Algolia
function addToAlgolia(object, indexName) {
 console.log('GETS IN addToAlgolia')
 console.log('object', object)
 console.log('indexName', indexName)
 const ALGOLIA_ID = functions.config().algolia.app_id;
 const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
 const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
 const index = client.initIndex(indexName);
return new Promise((resolve, reject) => {
  index.addObject(object)
  .then(res => { console.log('res GOOD', res); resolve(res) })
  .catch(err => { console.log('err BAD', err); reject(err) });
 });
}
function editToAlgolia(object, indexName) {
 const ALGOLIA_ID = functions.config().algolia.app_id;
 const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
 const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
 const index = client.initIndex(indexName);
return new Promise((resolve, reject) => {
  index.saveObject(object)
  .then(res => { console.log('res GOOD', res); resolve(res) })
  .catch(err => { console.log('err BAD', err); reject(err) });
 });
}
function removeFromAlgolia(objectID, indexName) {
 const ALGOLIA_ID = functions.config().algolia.app_id;
 const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
 const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
 const index = client.initIndex(indexName);
return new Promise((resolve, reject) => {
  index.deleteObject(objectID)
  .then(res => { console.log('res GOOD', res); resolve(res) })
  .catch(err => { console.log('err BAD', err); reject(err) });
 });
}


var currentUser;
firebase.auth().onAuthStateChanged(user => {
     if (user) {
          currentUser = db.collection("users").doc(user.uid);
          console.log(currentUser);
          
          insertName();
          populateCardsDynamically();
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
          country: "Japan",
          name: "Kitchen Craft Eatery",
          city: "Burnaby",
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
          openingHour: "10:00 am",
          closingHour: "9:00 pm",
          details: "Chilan goes here regularly"

     });
}

function populateCardsDynamically() {
     let cardTemplate = document.getElementById("postCardTemplate");
     let postCardTemplate = document.getElementById("postCardGroup");

     db.collection("posts").get()
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
}
//populateCardsDynamically()

function addLikes(postID) {
     console.log("inside");
     db.collection("posts").where("code", "==", postID)
          .get()
          .then(queryPost => {
               size = queryPost.size;
               posts = queryPost.docs;
               if (size = 1) {
                    id = posts[0].id;
                    console.log(id);
                    db.collection("posts").doc(id).update({
                         scores: firebase.firestore.FieldValue.increment(1)
                    })
               } else {
                    console.log("Query has more than one data.")
               }
          })
          .catch((error) => {
               console.log("Error getting documents: ", error)
          })
}

function saveBookmark(postID) {
     currentUser.set({
          bookmarks: firebase.firestore.FieldValue.arrayUnion(postID)
        
     }, {
          merge: true
     }) 
     .then(function() {
          console.log("Post is saved for: " + currentUser);
          var iconID = 'save-' + postID;
          document.getElementById(iconID).innerText = 'bookmark';
     });

}


