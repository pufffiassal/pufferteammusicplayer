const chooseMusicBtn = document.getElementById("chooseMusicBtn");
const musicModal = document.getElementById("musicModal");
const closeBtn = document.querySelector(".close");
const musicFileInput = document.getElementById("musicFile");
const audioPlayer = document.getElementById("audioPlayer");
const playlistList = document.getElementById("playlistList");
let isTransitioning = false;
let playlist = [];
chooseMusicBtn.addEventListener("click", () => {
    musicModal.style.display = "block";
});
closeBtn.addEventListener("click", () => {
    musicModal.style.display = "none";
});
musicFileInput.addEventListener("change", () => {
    const selectedFiles = musicFileInput.files;
    if (selectedFiles && selectedFiles.length > 0) {
        playlist = Array.from(selectedFiles);
        populatePlaylist();
    }
});
function populatePlaylist() {
    playlistList.innerHTML = "";
    playlist.forEach((file, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="#" data-index="${index}">${file.name}</a>`;
        playlistList.appendChild(listItem);
    });
}
playlistList.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault();
        const index = event.target.getAttribute("data-index");
        playAudio(playlist[index]);
    }
});
function playAudio(selectedFile) {
    audioPlayer.src = URL.createObjectURL(selectedFile);
    audioPlayer.load();
    isTransitioning = true;
    audioPlayer.play();
    audioPlayer.addEventListener("canplay", () => {
        audioPlayer.play();
    });
    audioPlayer.addEventListener("timeupdate", () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        if (duration - currentTime < 3 && !isTransitioning) {
            isTransitioning = true;
            audioPlayer.src = "";
            audioPlayer.load();
            playNext();
        }
    });
}
function playNext() {
    if (playlist.length > 0) {
        const nextFile = playlist.shift();
        playAudio(nextFile);
        populatePlaylist();
    }
}
