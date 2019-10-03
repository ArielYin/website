
let oBtn = document.querySelector("p");
let oMaskDiv = document.querySelector(".mask");
let oLoginDiv = document.querySelector(".login");
let oCloseBtn = document.querySelector(".close");

//show the login block
oBtn.onclick = function () {
    oMaskDiv.style.display = "block";
    oLoginDiv.style.display = "block";
};

//click close button to close the login window
oCloseBtn.onclick = function () {
    oMaskDiv.style.display = "none";
    oLoginDiv.style.display = "none";
};

oLoginDiv.onmousedown = function (event) {
    event = event || window.event;
    let x = event.pageX - oLoginDiv.offsetLeft;
    let y = event.pageY - oLoginDiv.offsetTop;

    oLoginDiv.onmousemove = function (event) {
        event = event || window.event;
        // calculate offset
        let offsetX = event.pageX - x;
        let offsetY = event.pageY - y;
        // set new location
        oLoginDiv.style.left = offsetX + "px";
        oLoginDiv.style.top = offsetY + "px";
    }
};

oLoginDiv.onmouseup = function () {
    oLoginDiv.onmousemove = null;
};