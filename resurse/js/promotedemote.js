window.addEventListener("DOMContentLoaded", () => {
    var promoteButtons = document.getElementsByClassName("promoteuser");
    var demoteButtons = document.getElementsByClassName("demoteuser");
    var userId;
    var action = null;

    for(let but of promoteButtons){
        but.addEventListener("click", () => {
            userId = but.id;
            userId = userId.split("user")[1];
            action = "promote";
            changeUserStatus(action, userId);
        })
    }
    for(let but of demoteButtons){
        but.addEventListener("click", () => {
            userId = but.id;
            userId = userId.split("user")[1];
            action = "demote";
            changeUserStatus(action, userId);
        })
    }

    
})

function changeUserStatus(action, userId){
    fetch(`/getUserRole/${userId}`)
    .then(response => response.json())
    .then(data => {
        if(data.userRole == "admin" && action == "demote") {
            fetch(`/demoteUser/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log("Actualizare cu succes, userul a fost retrogradat!");
                location.reload();
            })
            .catch(error => {
                console.error("Nu poti retrograda acest user!");
            })
        } else if(data.userRole == "common" && action == "promote") {
            fetch(`/promoteUser/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log("Actualizare cu succes, userul a fost promovat!");
                location.reload();
            })
            .catch(error => {
                console.error("Nu poti promova acest user!", userId);
            })
        } else {
            console.log("Not applicable");
        }
    })
    .catch(error => {
        console.error("Eroare in timpul actulizarii");
    })
}