window.onload= function(){
    var formular = document.getElementById("form_inreg");
    if(formular){
    formular.onsubmit = () => {
            if(document.getElementById("parl").value != document.getElementById("rparl").value){
                alert("The password field and retyped password are not the same! Try to retype both of them.");
                return false;
            }

            return true;
        }
    }
 }