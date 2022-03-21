function read_display_Quote() {
    var event = new Date(); 
    var options = { weekday: 'long' }; 
    var weekDay = event. toLocaleDateString('en-US', options).toLowerCase();
    console. log(weekDay);
    
    db.collection("quotes").doc(weekDay)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(weekdayDoc => {                                                               //arrow notation
           console.log(weekdayDoc.data());                          //.data() returns data object
           document.getElementById("quote-goes-here").innerText = weekdayDoc.data().quotes;      //using javascript to display the data on the right place
           

           //Here are other ways to access key:value data fields
           //$('#quote-goes-here').text(c.data().quote);                                       //using jquery object dot notation
           //$("#quote-goes-here").text(c.data()["quote"]);                                    //using json object indexing
      })
}
read_display_Quote()        //calling the function

function insertName() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me know who is the user that logged in the uid
            currentUser = db.collection("users").doc(user.uid); // will do to the firestone and 
            currentUser.get().then(userDoc=>{
                //get the user name
                var user_Name = userDoc.data().name;                
                console.log(user_Name);
                document.getElementById("name-goes-here").innerHTML=user_Name;
            })
            .finally();
        }


    })
}
insertName();
