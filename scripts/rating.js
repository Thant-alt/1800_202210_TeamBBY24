function writeNewComment(uid, username, picture, title, body) {
    const db = getDatabase();

    const postData = {
        author: username
        uid: uid
        body: body
        title: title
    }

    firebase.database().ref("Comments").set ({
        comment: document.getElementById("comment").value
    });
}
writeData();
