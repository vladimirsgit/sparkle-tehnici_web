window.addEventListener("DOMContentLoaded", () => {
    var deleteButton = document.getElementById("deleteaccountbutton");
    deleteButton.addEventListener("click", () => {
        var password = prompt("Please enter your password:");
        if(password){
            fetch("deleteUser", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({password: password})
            })
            .then(response => response.json())
            .then(data => {
                if(data.status == "success"){
                    console.log("Account deleted!");
                } else {
                    console.error("Failed to delete account!");
                }
            })
            .catch(error => {
                console.error("Cannot delete account!");
            })
        }
        
    })
})