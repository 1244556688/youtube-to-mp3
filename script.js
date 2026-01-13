const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const trackTitle = document.getElementById("track-title");
const volume = document.getElementById("volume");

// 放入你的播放清單（檔案路徑 + 標題）
const playlist = [
  { title: "Song One", file: "song1.mp3" },
  { title: "Song Two", file: "song2.mp3" },
  { title: "Song Three", file: "song3.mp3" }
];

let trackIndex = 0;

// 初始化
function loadTrack(index) {
  audio.src = playlist[index].file;
  trackTitle.textContent = playlist[index].title;
  audio.load();
}
loadTrack(trackIndex);

// 播放 / 暫停
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = "<span>⏸️</span>";
  } else {
    audio.pause();
    playPauseBtn.innerHTML = "<span>▶️</span>";
  }
});

// 上一首
prevBtn.addEventListener("click", () => {
  trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
  loadTrack(trackIndex);
  audio.play();
  playPauseBtn.innerHTML = "<span>⏸️</span>";
});

// 下一首
nextBtn.addEventListener("click", () => {
  trackIndex = (trackIndex + 1) % playlist.length;
  loadTrack(trackIndex);
  audio.play();
  playPauseBtn.innerHTML = "<span>⏸️</span>";
});

// 更新時間 & 進度條
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const currentPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = currentPercent + "%";

    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
    currentTimeEl.textContent = `${minutes}:${seconds}`;

    let durMin = Math.floor(audio.duration / 60);
    let durSec = Math.floor(audio.duration % 60).toString().padStart(2, "0");
    durationEl.textContent = `${durMin}:${durSec}`;
  }
});

// 點擊進度條拖動
progressBar.addEventListener("click", (e) => {
  const pos = e.offsetX / progressBar.clientWidth;
  audio.currentTime = pos * audio.duration;
});

// 音量
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});
