const videos = [
  { src: 'videos/sample1.mp4', title: 'Sample 1' },
  { src: 'videos/sample2.mp4', title: 'Sample 2' }
  { src: 'videos/sample3.mp4', title: 'Sample 3' },
  { src: 'videos/sample4.mp4', title: 'Sample 4' },
];

// Create a copy of the original video playlist
const originalList = [...videos];

// Reference the <video> and the <source> elements
const video = document.getElementById('video');
const videoSource = document.getElementById('video-src');

// Reference other DOM elements
const videoList = document.getElementById('video-list');
const searchInput = document.getElementById('search-input');

// Initialize variables to track the current video index and shuffle state
let currentVideoIndex = 0;
let isShuffle = false;

// Function to update the video playlist displayed in the UI
function updatePlayList(playlist) {
  videoList.innerHTML = '';
  playlist.forEach((video, index) => {
    const li = document.createElement('li');
    li.textContent = video.title;
    li.dataset.index = index;
    videoList.appendChild(li);
  });
}
// Function to update the UI with video information
function updateUI(currentvideoIndex, playlist) {
  document.getElementById('video-title').textContent =
    playlist[currentvideoIndex]['title'];
  document.getElementById('video-artist').textContent =
    playlist[currentvideoIndex]['artist-name'];
}

// Function to play the current video
function playVideo(playlist, index) {
  currentVideoIndex = index;
  videoSource.src = playlist[index].src;
  video.load();
  video.play();
}

// Event delegation for video selection in the playlist
videoList.addEventListener('click', (e) => {
  const clickedItem = e.target.closest('li');
  if (clickedItem) {
    const index = parseInt(clickedItem.dataset.index);
    const currentPlaylist = isShuffle ? videos : originalList;
    playVideo(currentPlaylist, index);
  }
});

// Event listeners for play, next, and previous buttons
document.getElementById('play-button').addEventListener('click', () => {
  playvideo(isShuffle ? videos : originalList);
});

document.getElementById('next-button').addEventListener('click', () => {
  // Move to the next video and play it
  currentVideoIndex++;
  if (currentVideoIndex === originalList.length) {
    currentVideoIndex = 0;
  }
  playVideo(isShuffle ? videos : originalList, currentVideoIndex);
});

document.getElementById('prev-button').addEventListener('click', () => {
  // Move to the previous video and play it
  currentVideoIndex--;
  if (currentVideoIndex < 0) {
    currentVideoIndex = originalList.length - 1;
  }
  playVideo(isShuffle ? videos : originalList, currentVideoIndex);
});

// Function to shuffle the array in place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Event listener for the Shuffle button
document.getElementById('shuffle-button').addEventListener('click', (event) => {
  isShuffle = !isShuffle;

  if (isShuffle) {
    event.target.textContent = 'Click to Unshuffle';
    // Shuffle the playlist, update it, and play the first video
    shuffleArray(videos);
    updatePlayList(videos);
    currentvideoIndex = 0;
    playvideo(videos);
  } else {
    event.target.textContent = 'Click to Shuffle';
    // Restore the original playlist, update it, and play the first video
    updatePlayList(originalList);
    currentvideoIndex = 0;
    playvideo(originalList);
  }
});

// Event listener to filter the playlist based on search input
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredvideos = originalList.filter((video) =>
    video.title.toLowerCase().includes(searchTerm)
  );
  // Update the displayed playlist with the filtered videos
  updatePlayList(filteredvideos);
  updateUI(currentvideoIndex, originalList);
});

// Initialize the playlist and UI with the original list
updatePlayList(originalList);
updateUI(currentvideoIndex, originalList);
