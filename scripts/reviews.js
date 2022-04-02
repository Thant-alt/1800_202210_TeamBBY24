function showDetails() {
     // create a URL object
     let params = new URL(window.location.href);
     let id = params.searchParams.get("id");               //parse "id"
     let title = params.searchParams.get("title");   //parse "collection"
 
     let message = "Restaurant Name: " + title;           //build message to display
     message += " &nbsp | Restaurand Code:  " + id;
     document.getElementById("HikeName").innerHTML = hikeName;
     document.getElementById("details-go-here").innerHTML = message;
 }
 showDetails();