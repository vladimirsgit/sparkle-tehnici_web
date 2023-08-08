function updateTime(){
    var localTime = document.getElementById("localtime");
    localTime.innerHTML = "Your local time is: "
    localTime.innerHTML+= new Date().toLocaleTimeString();
}

window.addEventListener("DOMContentLoaded", () => {
    updateTime();
})
setInterval(updateTime, 1000);