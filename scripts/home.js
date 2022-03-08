function insertName() {
    // to check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // let me know who is the user that logged in the uid
            currentUser = db.collection("users").doc(user.uid); // will do to the firestone and 
            currentUser.get().then(userDoc => {
                //get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name) //jquery


            })
        }


    })
}
insertName();