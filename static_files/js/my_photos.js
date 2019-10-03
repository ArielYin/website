let oImg = document.querySelectorAll(".images");
let oMaskDiv = document.querySelector(".mask");
let oCross = document.querySelector(".close1");
let oDiv = document.querySelector(".zoom-img");
var un = "";
var pId = 0;

for(let i = 0; i < oImg.length; i++){
    oImg[i].style.cursor = "pointer";
    oImg[i].addEventListener("click", function(){
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
// let oMaskDiv = document.querySelector(".mask");
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

//click home button to go back
let oNew = document.querySelector(".leaderBoard ul li:first-child");
oNew.onclick = function() {
    location.href = "../homepage.html";
};

//click upload button to upload images

//click login button to get login window
let oBtn1 = document.querySelector(".leaderBoard ul li:nth-child(3)");
// let oMaskDiv = document.querySelector(".mask");
let oUploadDiv = document.querySelector(".wrap");
let oCloseBtn1 = document.querySelector(".close2");

//show the login block
oBtn1.onclick = function () {
    oMaskDiv.style.display = "block";
    oUploadDiv.style.display = "block";
};

//click close button to close the login window
oCloseBtn1.onclick = function () {
    oMaskDiv.style.display = "none";
    oUploadDiv.style.display = "none";
};

oUploadDiv.onmousedown = function (event) {
    event = event || window.event;
    let x = event.pageX - oUploadDiv.offsetLeft;
    let y = event.pageY - oUploadDiv.offsetTop;

    oUploadDiv.onmousemove = function (event) {
        event = event || window.event;
        // calculate offset
        let offsetX = event.pageX - x;
        let offsetY = event.pageY - y;
        // set new location
        oUploadDiv.style.left = offsetX + "px";
        oUploadDiv.style.top = offsetY + "px";
    }
};

oUploadDiv.onmouseup = function () {
    oUploadDiv.onmousemove = null;
};



$(document).ready(() => {
  $('#loginSubmitButton').click(() => {
    const requestURL = 'photoSrc/' + $('#insertUsernameBox').val()+'/'+$('#insertPasswordBox').val();
    console.log('making ajax request to:', requestURL);

    $.ajax({

      url: requestURL,
      type: 'GET',
      dataType : 'json',
      success: (data) => {

        console.log('You received some data!', data);
          un = data.a.username;
          $("#username").html(data.a.username);
          $("#email").html(data.a.email);
          var div = document.getElementById("profile");
          div.setAttribute("style", `background-image: url(../images/${data.a.profileName});`);

          if(data.a.src){
            $('#image1').attr('src', "images/"+data.a.src);
            $('#title1').html(data.a.title);
            $('#description1').html(data.a.description);
          }

          if(data.b.src){
            $('#image2').attr('src', "images/"+data.b.src);
            $('#title2').html(data.b.title);
            $('#description2').html(data.b.description);
          }

          if(data.c.src){
            $('#image3').attr('src', "images/"+data.c.src);
            $('#title3').html(data.c.title);
            $('#description3').html(data.c.description);
          }

          if(data.d.src){
            alert("aaa");
            $('#image4').attr('src', "images/"+data.d.src);
            $('#title4').html(data.d.title);
            $('#description4').html(data.d.description);
          }


      },
    });

    const requestURL2 = 'username/' + $('#insertUsernameBox').val();
    console.log('making ajax request to:', requestURL2);

    $.ajax({
      url: requestURL2,
      type: 'GET',
      dataType : 'json',
      success: (data)=>{
        pId = data.id;
      }
    });

  });


  $('#uploadSubmitButton').click(() => {

    var fullPath = document.getElementById('upload').value;
    if (fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
    }
    $('#img').attr('src', "images/"+filename);

    $.ajax({
      url : 'photoSrc',
      type : 'POST',
      data : {
        src : filename,
        personId : pId,
        title : $('#insertTitleBox').val(),
        description : $('#insertDescriptionBox').val()
      },
      success : (data) =>{
        // $('#status').html(data.message);
      }
    })


  });




});
