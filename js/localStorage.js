var albumsArray = [];

var DeleteAlbum = function (span) {
    event.target.parentElement.remove();
    $(".mp3player audio").removeAttr("src");
    $(".mp3player ul li").remove();
    $("#textInMp3").fadeOut();
    $(".mp3player").fadeOut();

    var id =  parseInt($(event.target.parentElement).attr("id"));

    for (var n = 0 ; n < albumsArray.length ; n++) {
        if (albumsArray[n].album_id === id) {
            albumsArray.splice(n,1);
            break;
        }
    }
    localStorage.setItem("Albums", JSON.stringify(albumsArray));
}

$(document).ready(function(){
    albumsArray = JSON.parse(localStorage.getItem("Albums"));
    if(albumsArray == null) return;
    for	( var i = 0; i < albumsArray.length; i++ ){

        $('.trash').on("click", function() {
                DeleteAlbum(this);
        });


        var title = albumsArray[i].album_name + ' ' + albumsArray[i].album_artist;

        var newLetteringTitle = document.createElement("span");
        newLetteringTitle.innerHTML = title;
        newLetteringTitle.className ='titleOfAlbum span';


        $("#flex").append("<div class=disc id = " + albumsArray[i].album_id  + ">" + "<div class='badge'></div>"
            + "<span class='titleOfAlbum span'>" + title
            +"</span>"
            +"<img class=disc1 src='" + albumsArray[i].album_image + "'" +">"
            + "<span class=" + "'fa fa-edit edit'" + "> </span>"
            + "<span class=" + "'fa fa-trash trash'" + "> </span>"
            + "<span class=" + "'pause fa fa-pause'" + "> </span>"
            + "<span class=" + "'fa fa-play play'" + " data-song='" + i + "'> </span>"
        )
    };

    var newPlay = document.createElement("span");
    newPlay.className = 'fa fa-play play';

    //newPlay.onclick = function () {
        //AddPlay(albumsArray[i])
    //}
    $(".fa-play").on("click",  function () {

        var index = parseInt($(this).attr("data-song"));
        AddPlay(albumsArray[index]);


        /*$("html,body").animate({
            scrollTop: 225
        }, 500);
        var index = parseInt($(this).attr("data-song"));

        var currentPlaylist = albumsArray[index].playlist;
        $.albumsArraySongs = [];
        $(".mp3player audio").removeAttr("src");
        $(".mp3player ul li").remove();
        $("#nameSterming").text("");
        $("title").text("Music Player");

        $("#textInMp3").css("display","block");
        $(".mp3player").css("display","block");
        $(".discOnPlay").css("display","block");
        $("#discImgPlay").css("display","block");
        $("#audiomp3").css("display","block");

        document.getElementById("audiomp3").src= albumsArray[index].playlist[0].songUrl;
        document.getElementById("audiomp3").play();

        $("#WindowOfSongs").css("display","block");
        var mp3 = $(".mp3player");
        mp3.animate({width: '980px', opacity: '0.4'}, "slow");
        mp3.animate({height: '352px', opacity: '0.6'}, "slow");
        mp3.animate({opacity: '1'}, "slow");

        for( var j = 0 ; j < albumsArray[index].playlist.length; j++){
            $("#newplaylist").append("<li id = " + j + ">" + albumsArray[index].playlist[j].songTitle + "</li>");
            $.albumsArraySongs.push(currentPlaylist[j].songUrl);

            $("li").on("click", function(){
                var songIndex = $("li").val();
                $("li").prevAll().css("opacity","0.8");
                $("li").prevAll().css("font-weight","normal");
                $("li").removeClass("content");
                $("#audiomp3").attr("src", albumsArray[index].playlist[songIndex].songUrl);
                $("#nameSterming").text(event.target.textContent);
                $("title").text("Now Playing: " + event.target.textContent);
                $(this).css("opacity","1");
                $(this).css("font-weight","bold");
                $(this).addClass("content");
            });
        }
        // $("#newplaylist").append("<li id = " + $.i + ">" + $.result[0].playlist[$.i].name + "</li>");
        /* $.AlbumFromServer(event.target.parentElement.id, function(playlist){
                for(var i = 0; i < playlist.length; i++){
                    $.albumsArraySongs.push(playlist[i].songUrl);
                }
            },

            function (albumImg){
                $("#discImgPlay").attr("src" , albumImg ); },
            function (albumName){
                $("#textInMp3").text(albumName);

            });*/
    });

    $(".pauseOnPl").on('click', function () {
        document.getElementById("audiomp3").pause();
    })

    $(".close").on('click' , function(){
        $.albumsArraySongs = [];
        $(".mp3player audio").removeAttr("src");
        $(".mp3player ul li").remove();
        $("#nameSterming").text("");
        $("title").text("Music Player");
        document.getElementById("audiomp3").pause();
    });


    $(".titleOfAlbum").lettering();
    $.AlbumFromServer = function(id, playlist, albumImg, albumName){
        $.ajax({
            method: "GET",
            url: "http://localhost:80/Project%202/db.json" + id,
            success: function(dataString){
                $.result = $.makeArray(dataString);
                for($.i = 0; $.i < $.result[0].playlist.length; $.i++){
                    $("#newplaylist").append("<li id = " + $.i + ">" + $.result[0].playlist[$.i].name + "</li>");
                }
            }
        });
    }

});

var findAnAlbum = function (id) {
    for (var i = 0; i < albumsArray.length; i++){
            if(albumsArray[i].album_id == id)
                return albumsArray[i];
    }
    return 0;
}

var AddPlay = function (album) {
    $("html,body").animate({
        scrollTop: 225
    }, 500);

    $(".mp3player audio").removeAttr("src");
    $(".mp3player ul li").remove();
    $("#nameSterming").text("");
    $("title").text("Music Player");

    $("#textInMp3").css("display","block");
    $(".mp3player").css("display","block");
    $(".discOnPlay").css("display","block");
    $("#discImgPlay").css("display","block");
    $("#audiomp3").css("display","block");

    document.getElementById("audiomp3").src= album.playlist[0].songUrl;
    document.getElementById("audiomp3").play();

    $("#WindowOfSongs").css("display","block");
    var mp3 = $(".mp3player");
    mp3.animate({width: '980px', opacity: '0.4'}, "slow");
    mp3.animate({height: '352px', opacity: '0.6'}, "slow");
    mp3.animate({opacity: '1'}, "slow");

    for( var j = 0 ; j < album.playlist.length; j++){
        var title = album.playlist[j].songTitle
        $("#newplaylist").append("<li id = " + j + ">" + title + "</li>");

        $("li").on("click", function(){
            var songIndex = $("li").val();
            $("li").prevAll().css("opacity","0.8");
            $("li").prevAll().css("font-weight","normal");
            $("li").removeClass("content");
            $("#audiomp3").attr("src", album.playlist[songIndex].songUrl);
            $("#nameSterming").text(event.target.textContent);
            $("title").text("Now Playing: " + event.target.textContent);
            $(this).css("opacity","1");
            $(this).css("font-weight","bold");
            $(this).addClass("content");
        });
    }
}


