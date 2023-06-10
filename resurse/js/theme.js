let tema = localStorage.getItem("tema");
if(tema)
    document.body.classList.add("light");

window.addEventListener("load", function(){
    document.getElementById("tema").onclick = function(){
        if(document.body.classList.contains("light")){
            document.body.classList.remove("light");
            localStorage.removeItem("tema");
        } else {
            document.body.classList.add("light");
            localStorage.setItem("tema", "light");
        }
    }
})