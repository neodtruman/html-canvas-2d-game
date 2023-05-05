class ImageLoader {
  constructor(imagePath) {
    this.imagePath = imagePath;
    this.image = new Image();
  }

  load() {
    this.image.src = this.imagePath;
    return new Promise((resolve, reject) => {
      this.image.onload = () => resolve(this.image);
      this.image.onerror = reject;
    });
  }
}
