function logOut(){
    console.log("Sup");

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
              }).catch((error) => {
                  console.log(error);
                // An error happened.
              });
        }
    })
    window.location.assign("index.html");
}
