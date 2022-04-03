function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userBirthday = userDoc.data().birthDay;
                    var userEmail = userDoc.data().email;
                    var userGender = userDoc.data().gender;
                    var userRegion = userDoc.data().region;
                    var userPhoneNumber = userDoc.data().phoneNumber;
                    

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userBirthday != null) {
                        document.getElementById("birthdayInput").value = userBirthday;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail; 
                    }
                    if (userRegion != null) {
                        document.getElementById("regionInput").value = userRegion;
                    }
                    if (userGender != null) {
                        document.getElementById("genderInput").value = userGender;
                    }
                    if (userPhoneNumber != null) {
                        document.getElementById("phoneNumberInput").value = userPhoneNumber;
                    }
                })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
 }
 
 editUserInfo();

 function saveUserInfo() {
    userName = document.getElementById('nameInput').value;       
    localStorage.setItem("userName", userName);
    userBirthday = document.getElementById('birthdayInput').value;     
    userEmail = document.getElementById('emailInput').value;
    userRegion = document.getElementById('regionInput').value;
    localStorage.setItem("userRegion", userRegion);
    userGender = document.getElementById('genderInput').value;
    userPhoneNumber = document.getElementById('phoneNumberInput').value;

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            //write/update the database 
            currentUser.update({
                name: userName,
                birthDay: userBirthday,
                email: userEmail,
                region: userRegion,
                gender: userGender,
                phoneNumber: userPhoneNumber
            })
            .then(() => {
                console.log("Document successfully updated!");
                document.getElementById('personalInfoFields').disabled = true;
                
                    window.location.assign("main.html");
            })
}
    })
}