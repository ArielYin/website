let oGallery = document.querySelector(".gallery");
let oItems = initImages(oGallery);
window.onload = function(){
    // initialize images
    let cols = resetWidth(oGallery, oItems);
    waterfall(oItems, cols);

    window.onresize = throttle(function () {
        let oItems = document.querySelectorAll(".box");
        let cols = resetWidth(oGallery, oItems);
        waterfall(oItems, cols);
    }, 500);
};

/**
 * resize the width
 * @param oGallery box to be modified
 * @param oItems all items
 * @returns {number} column number
 */
function resetWidth(oGallery, oItems) {
    let {width, height} = getScreen();
    let imgWidth = oItems[0].offsetWidth;
    let cols = Math.floor(width / imgWidth);
    let mainWidth = cols * imgWidth;
    oGallery.style.width = mainWidth + "px";
    oGallery.style.margin = "0 auto";
    return cols;
}

//create all images
function initImages(oGallery){
    for(let i = 1; i <= 40; i++){
        let oDiv = document.createElement("div");
        let subdue = document.createElement("div");
        oDiv.className = "box";
        subdue.innerHTML = "insert description";

        oGallery.appendChild(oDiv);
        oDiv.appendChild(subdue);
        let oImg = document.createElement("img");
        let index = i < 10 ? "0" + i : i;
        oImg.src = `../images/img${index}.jpg`;
        oImg.className = "images";
        console.log(oImg.src);
        console.log(window.getComputedStyle(oImg));
        oDiv.appendChild(oImg);
    }
    return document.querySelectorAll(".box");
}

/**
 * waterfall layout
 * @param oItems images
 * @param cols column num
 */
function waterfall(oItems, cols) {
    let rowHeight = [];
    for(let i = 0; i < oItems.length; i++){
        let item = oItems[i];
        if(i < cols){
            item.style.position  = "";
            rowHeight.push(item.offsetHeight);
            console.log(rowHeight);
        }else{
            let minHeight = Math.min.apply(this, rowHeight);
            let minIndex = rowHeight.findIndex(function (value) {
                return value === minHeight;
            });
            let minItem = oItems[minIndex];
            let minLeft = minItem.offsetLeft;

            item.style.position = "absolute";
            item.style.left = minLeft + "px";
            item.style.top = minHeight + "px";

            rowHeight[minIndex] += item.offsetHeight;
        }
    }
}

//click home button to go back
let oNew = document.querySelector(".leaderBoard ul li");
oNew.onclick = function() {
    location.href = "../homepage.html";
};

//click image to zoom in
let oImg = document.querySelectorAll(".images");
let oMaskDiv = document.querySelector(".mask");
let oCross = document.querySelector(".close1");
let oDiv = document.querySelector(".zoom-img");

for(let i = 0; i < oImg.length; i++){
    oImg[i].style.cursor = "pointer";

    oImg[i].addEventListener("click", function(){
        console.log(oImg[i].src);
        oMaskDiv.style.display = "block";
        oMaskDiv.appendChild(oDiv);
        oDiv.style.backgroundImage = "url(" + oImg[i].src + ")";
        oDiv.appendChild(oCross);
        oCross.style.display = "block";
    });
}

oCross.onclick = function () {
    oMaskDiv.removeChild(oDiv);
    oMaskDiv.style.display = "none";
};

//click login button to get login window
let oBtn = document.querySelector(".leaderBoard ul li:last-child");
let oMaskDiv1 = document.querySelector(".mask1");
let oLoginDiv = document.querySelector(".login");
let oCloseBtn = document.querySelector(".close");

//show the login block
oBtn.onclick = function () {
    oMaskDiv1.style.display = "block";
    oLoginDiv.style.display = "block";
};

//click close button to close the login window
oCloseBtn.onclick = function () {
    oMaskDiv1.style.display = "none";
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
