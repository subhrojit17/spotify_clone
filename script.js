console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('./songs/song10.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "Breaking The Habit", filePath: "./songs/song10.mp3", coverPath: "./images/cover10.png"},
    {songName: "What I've Done", filePath: "./song/song9.mp3", coverPath: "./images/cover9.jpg"},
    {songName: "Shadow of the Day", filePath: "./song/song8.mp3", coverPath: "./images/cover8.jpg"},
    {songName: "New Divide", filePath: "./song/song7.mp3", coverPath: "./images/cover7.jpg"},
    {songName: "Runaway", filePath: "./song/song6.mp3", coverPath: "./images/cover6.jpeg"},
    {songName: "Points of Authority", filePath: "./song/song5.mp3", coverPath: "./images/cover5.png"},
    {songName: "One Step Closer", filePath: "./song/song4.mp3", coverPath: "./images/cover4.jpg"},
    {songName: "In The End", filePath: "./song/song3.mp3", coverPath: "./images/cover3.jpg"},
    {songName: "Numb", filePath: "./song/song2.mp3", coverPath: "./images/cover2.jpg"},
    {songName: "One More Light", filePath: "./song/song1.mp3", coverPath: "./images/cover1.jpeg"}
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;

})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `./songs/song${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex <=1){
        songIndex = 1
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `./songs/song${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex >=10){
        songIndex = 1
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `./songs/song${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})