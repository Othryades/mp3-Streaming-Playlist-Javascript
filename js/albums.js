var Albums  = JSON.parse(localStorage.getItem("Albums"));

var Album = function (name, band, img, songs) {
    this.album_name = name;
    this.album_artist = band;
    this.album_image = img;
    //TODO - parse to int /number
    this.album_id = getLastId(); //get last id in albums array and ++
    this.playlist  = songs;
}

function getLastId () {
    var maxId = -1;
    if(Albums == null ) return 1;
    for (var i=0;i<Albums.length;i++) {
        var id = parseInt(Albums[i].album_id); //to number
        if(id > maxId )
                maxId = id;
    }
    return maxId + 1;
}

function addAlbums() {
    if (!(validatemp3Input())) {
        alert("No song!");
        return;
    }
    if (!(valiMp3())) {
        alert("Has to end with .mp3");
        return;
    }

    var album_name = $("#nameAlbum").val();
    var album_artist = $("#authorAlbum").val();
    var album_image = $("#imgurl").val();
    var newDisc = document.createElement("div");
    newDisc.className = 'disc';

    var newImg = document.createElement("img");
    newImg.src = document.getElementById("imgurl").value;
    newImg.className = 'disc1';

    var newBadge = document.createElement("div");
    newBadge.className = 'badge';

    var newTextAlbum = document.createElement("span");
    newTextAlbum.innerHTML = document.getElementById("nameAlbum").value;
    newTextAlbum.className = 'textOfalbum';

    var newTextBand = document.createElement("span");
    newTextBand.innerHTML = document.getElementById("authorAlbum").value;
    newTextBand.className = 'textOfBand';

    var newLetteringTitle = document.createElement("span");
    newLetteringTitle.innerHTML = document.getElementById("nameAlbum").value + " " + document.getElementById("authorAlbum").value;
    newLetteringTitle.className = "titleOfAlbum"
    newLetteringTitle.className = 'titleOfAlbum span';

    var newEdit = document.createElement("span");
    //newEdit.className = 'fa fa-edit edit';

    var newTrash = document.createElement("span");
    newTrash.className = 'fa fa-trash trash';

    newTrash.onclick= function(){
        DeleteAlbum(newTrash);
    }

    var newPause = document.createElement("span");
    newPause.className = 'pause fa fa-pause';

    var newPlay = document.createElement("span");
    newPlay.className = 'fa fa-play play';

    var songs = [];


    var songsInAlbum = function (nameOfSong, urlOfSong) {
        this.songTitle = nameOfSong;
        this.songUrl = urlOfSong;
    };

    var x = document.querySelectorAll(".nNameSong");
    var y = document.querySelectorAll(".urlSong");

    //add only if not string empty
    for (var i = 0; i < x.length; i++) {

        for (i = 0; i < y.length; i++) {

            var nameOfSong = $(x[i]).val();
            var urlOfSong = $(y[i]).val();
            if(nameOfSong !== "" && urlOfSong !== ""){
                var newSong = new songsInAlbum(nameOfSong, urlOfSong);
                songs.push(newSong);

            }

        }
    }


    var newAlbum = new Album(album_name, album_artist, album_image, songs);
    newAlbum.playlist = songs;
    if(Albums == null ) {Albums  = []}
    Albums.push(newAlbum);

    //save album
    localStorage.setItem("Albums", JSON.stringify(Albums));

    newDisc.appendChild(newBadge);
    newDisc.appendChild(newLetteringTitle);
    newDisc.appendChild(newImg);
    newDisc.appendChild(newEdit);
    newDisc.appendChild(newTrash);
    newDisc.appendChild(newPause);
    newDisc.appendChild(newPlay);

    $("#flex").append(newDisc);
    $(".titleOfAlbum").lettering();
    $("#albumWindow2").hide();
    $("#overlay").hide();
    $("body").removeClass("stop-scrolling");

    $(".fa-play").on("click", function(){
        var index = parseInt($(this).attr("data-song"));

        AddPlay(newAlbum)

    });

    function clearform() {
        $(".nNameSong").val("");
        $(".urlSong").val("");
        $("#nameAlbum").val("");
        $("#authorAlbum").val("");
        $("#imgurl").val("");
    }
    clearform();

}