$(document).ready(function () {

    $("#addAlb").on('click', function () {
        $("#albumWindow").fadeIn();
        $("#nameAlbum").focus();
        $("#overlay").show();
        $("body").addClass("stop-scrolling");
    });

    $(".plus").on('click', function () {
        $("#albumWindow").fadeIn();
        $("#overlay").show();
    });

    $("#resetBt").on('click', function () {
        $('#imgprv').attr('src', 'resources/img/1.png');
    });

    $("#submit1").on('click', function () {
        if (!( validateInput(nameAlbum) && validateInput(authorAlbum) && ValiImg(imgurl) )) {
            alert("Missing input");
            return;
        }
        $("#albumWindow").hide();
        $("#albumWindow2").show();
        $(".newSong").focus();
    });

    $("#overlay").on('click', function () {
        $("#albumWindow").fadeOut();
        $("#albumWindow2").fadeOut();
        $("#overlay").fadeOut();
        $("body").removeClass("stop-scrolling");
        $("#editAlbum").fadeOut();
    });

    $(".close").on('click', function () {
        var mp3 = $(".mp3player");
        $(".close").hide();
        $("#WindowOfSongs").hide();
        $("#audiomp3").css("display", "none");
        $(".discOnPlay").css("display", "none");
        $(".discImgPlay").css("display", "none");
        $("#textInMp3").fadeOut();

        mp3.animate({width: '0px', opacity: '0.4'}, "slow");
        mp3.animate({height: '0px', opacity: '0.1'}, "slow");
        mp3.animate({opacity: '0'}, 0);
        $("#discImgPlay").clearQueue().stop();
        $("#discOnPlay").hide();
        $("#textInMp3").hide();
    });

    var maxFields = 9999;
    var nameDiv = $(".nameDiv");
    var urlDiv = $(".urlDiv");
    var addButton = $(".addFields");
    var x = 1;
    var idOfIn = 4;
    $(addButton).click(function (e) {
        idOfIn++;
        e.preventDefault();
        if (x < maxFields) {
            x++;
            $(nameDiv).append('<div class="nameDiv">Name:<input type="text" id="nameOfS' + idOfIn + "'" + '"placeholder="Name Of Song" class="nNameSong styInputPl"/></div>');
            $(urlDiv).append('<div class="urlDiv">Url:<input type="text" id="urlOfS' + idOfIn + "'" + '"placeholder="Http://" class="urlSong styInputPl" onblur="valiMp3()"/></div>');
        }
    });

});

function validateInput(input) {
    if (input.value.length == 0) {
            input.style.borderColor = "red";
            return false;
    }
    else {
        input.style.borderColor = "gray";
    }
    return true;
}

function ValiImg(input) {
    var str = $("#imgurl").val();
    var res = str.toLocaleLowerCase();
    var patt1 = /\.jpg$/;
    var result = res.match(patt1);
    var pngValidate = /\.png$/;
    var resultPng = res.match(pngValidate);

    if (result == ".jpg" || resultPng == ".png") {
        $("#imgprv").attr("src", $("#imgurl").val());
        input.style.borderColor = "gray";
        return true;
    }
    else {
        input.style.borderColor = "red";
        return false;
    }
}

function valiMp3() {
    var contentUrl = $(".urlSong");

    for (i = 0; i < contentUrl.length; i++) {
        var res1 = contentUrl[i].value.toLocaleLowerCase();
        var patt11 = /\.mp3$/;
        var result1 = res1.match(patt11);
        var flag1;

        if (!(result1)) {
            contentUrl[i].style.borderColor = "red";
            flag1 = false;
        }
        else {
            if ((result1) || (contentUrl[i].value == "")) {
                contentUrl[i].style.borderColor = "gray";
                flag1 = true;
            }
            else {
                contentUrl[i].style.borderColor = "red";
                flag1 = false;
            }
        }
    }
    return flag1;
}

function validatemp3Input() {
    var nameSong = $(".nNameSong");
    var urlSong = $(".urlSong");
    var flag = false;
    for (i = 0; i < nameSong.length; i++) {
        if (nameSong[i].value.length != 0 || urlSong[i].value.length != 0) {
            if (nameSong[i].value.length == 0 || urlSong[i].value.length == 0) {
                return false;
            }
            flag = true;
            return true;
        }
        else {
            if (flag) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}