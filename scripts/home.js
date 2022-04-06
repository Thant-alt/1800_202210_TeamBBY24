firebase.auth().onAuthStateChanged(user => {
    if (!user) {
         console.log("No user is singned in");
         window.location.href = "login.html";
    }
});

function uploadProfilePicture() {
    console.log("Derp");



    firebase.auth().onAuthStateChanged(user => {
        if (user) {
        const image_input2 = document.querySelector("#image_input");
        console.log(image_input2);
        var image = document.getElementById("mypic-goes-here");

        db.collection("users").doc(user.uid).get().then(
            retrievedUser => {
                var profilePicture = retrievedUser.data().profilePicture;
                if (profilePicture){
                    image.src = profilePicture;
                }
            }
        )

        image_input2.addEventListener("change", function (e) {
            console.log(image_input2.value);

            //the change event returns a file "e.target.files[0]"
            if (e.target.files[0]){
                var blob = URL.createObjectURL(e.target.files[0]);

                //change the DOM img element source to point to this file
                image.src = blob;    //assign the "src" property of the "img" tag
    
                var storageRef = firebase.storage().ref("images/" + new Date().getTime() + ".jpg"); // Get reference
                // Upload picked file to cloud storage
                storageRef.put(e.target.files[0])
                    .then(function () {
                        storageRef.getDownloadURL()
                            .then(function (url) { // Get URL of the uploaded file
                                console.log(url); // Save the URL into users collection
                                db.collection("users").doc(user.uid).update({
                                    "profilePicture": url
                                })
                                    .then(function () {
                                        console.log('Added Pic URL to Firestore.');
                                    })
                            })
                    })
            }
            
        })
    } else {
        console.log("No user is singned in");
        window.location.href = "login.html";
    }
});
}
uploadProfilePicture();


function read_display_Quote() {
    var event = new Date(); 
    var options = { weekday: 'long' }; 
    var weekDay = event.toLocaleDateString('en-US', options).toLowerCase();
    console.log(weekDay);
    
    db.collection("quotes").doc(weekDay)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(weekDayDoc => {                                                               //arrow notation
           console.log(weekDayDoc.data());                          //.data() returns data object
           document.getElementById("quote-goes-here").innerHTML = weekDayDoc.data().quotes;      //using javascript to display the data on the right place
           

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
