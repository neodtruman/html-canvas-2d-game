class Sound {
  constructor(soundPath) {
    this.sound = document.createElement("audio");
    this.sound.src = soundPath;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }

  play() {
    this.sound.play();
  }

  pause() {
    this.sound.pause();
  }
}
