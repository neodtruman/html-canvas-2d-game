class Hunter extends GameObject {
  constructor(camera, background, gravity, groundY, bulletFactory, bulletCounter) {
    super(camera);

    this.background = background;
    this.groundY = groundY;

    this.bulletFactory = bulletFactory;
    this.bulletCounter = bulletCounter;

    this.gravity = gravity;
    this.vx = 5;
    this.vy = 0;
    this.jumpCount = 0;

    this.currentFrame = 0;
    this.frameRate = 12;
    this.lastUpdate = 0;
    this.startShootingTime = 0; // status tracking

    this.shootingSound = new Sound("assets/sound/shot.wav");
  }

  setImages(imageData) {
    const setImageData = (image, numFrames) => {
      image.frameWidth = Math.round(image.width / numFrames);
      image.frameHeight = image.height;
      image.numFrames = numFrames;
    };

    // idle
    this.leftIdleImage = imageData.idle.leftIdleImage;
    setImageData(this.leftIdleImage, imageData.idle.numFrames);

    this.rightIdleImage = imageData.idle.rightIdleImage;
    setImageData(this.rightIdleImage, imageData.idle.numFrames);

    // Shooting
    this.leftShootingImage = imageData.shooting.leftShootingImage;
    setImageData(this.leftShootingImage, imageData.shooting.numFrames);

    this.rightShootingImage = imageData.shooting.rightShootingImage;
    setImageData(this.rightShootingImage, imageData.shooting.numFrames);

    // Running
    this.runLeftImage = imageData.run.runLeftImage;
    setImageData(this.runLeftImage, imageData.run.numFrames);

    this.runRightImage = imageData.run.runRightImage;
    setImageData(this.runRightImage, imageData.run.numFrames);
  }

  init(bulletList) {
    this.x = 100;
    this.y = this.groundY;
    this.status = HUNTER_IDLE_RIGHT;
    this.image = this.rightIdleImage;
    this.numFrames = this.image.numFrames;
    this.bulletList = bulletList;
  }

  // Draw the current frame of the animation
  draw() {
    const statusMap = {
      [HUNTER_IDLE_RIGHT]: this.rightIdleImage,
      [HUNTER_IDLE_LEFT]: this.leftIdleImage,
      [HUNTER_RUN_RIGHT]: this.runRightImage,
      [HUNTER_RUN_LEFT]: this.runLeftImage,
      [HUNTER_SHOOTING_RIGHT]: this.rightShootingImage,
      [HUNTER_SHOOTING_LEFT]: this.leftShootingImage,
    };
    this.image = statusMap[this.status];
    const adjustment = this.status === HUNTER_SHOOTING_LEFT ? -40 : 0;

    this.width = this.image.frameWidth;
    this.height = this.image.frameHeight;
    this.numFrames = this.image.numFrames;

    this.ctx.drawImage(this.image, this.currentFrame * this.width, 0, this.width, this.height, this.x - this.camera.cameraX + adjustment, this.y - this.camera.cameraY, this.width, this.height);
  }

  // Update the current frame of the animation
  update(time, currentPad) {
    if (time - this.lastUpdate > 1000 / this.frameRate) {
      this.currentFrame = (this.currentFrame + 1) % this.numFrames;
      this.lastUpdate = time;
    }

    // Update hunter's vertical position and velocity
    this.vy += this.gravity;
    this.y += this.vy;

    const isHunterOnAPad = currentPad !== null && this.y >= currentPad.y - this.height;
    const isHunterOnGround = this.y >= this.groundY;

    if (isHunterOnAPad || isHunterOnGround) {
      this.jumpCount = 0;
      this.vy = 0;
    }

    if (isHunterOnAPad) {
      this.y = currentPad.y - this.height + 10;
    } else if (isHunterOnGround) {
      this.y = this.groundY;
    }

    // Keep hunter within screen bounds
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > this.background.image.width) {
      this.x = this.background.image.width - this.width;
    }
  }

  controlHunter(time, keys) {
    if ((this.status === HUNTER_SHOOTING_LEFT || this.status === HUNTER_SHOOTING_RIGHT) && time - this.startShootingTime < 500) {
      // Keep the shooting status unchanged in 500ms
      return;
    }

    if (!keys.ArrowLeft && !keys.ArrowRight && !keys.ArrowUp && !keys[" "]) {
      if (this.status === HUNTER_RUN_LEFT || this.status === HUNTER_SHOOTING_LEFT) {
        this.status = HUNTER_IDLE_LEFT;
      } else if (this.status === HUNTER_RUN_RIGHT || this.status === HUNTER_SHOOTING_RIGHT) {
        this.status = HUNTER_IDLE_RIGHT;
      }
    }

    this.frameRate = 12;

    // Moving
    if (keys.ArrowLeft) {
      this.x -= this.vx;
      this.status = HUNTER_RUN_LEFT;
    }
    if (keys.ArrowRight) {
      this.status = HUNTER_RUN_RIGHT;
      this.x += this.vx;
    }

    // Shooting
    if (keys[" "]) {
      switch (this.status) {
        case HUNTER_IDLE_LEFT:
          this.status = HUNTER_SHOOTING_LEFT;
          if (this.bulletCounter.counter > 0) {
            this.shootingSound.play();
            this.bulletCounter.counter--;
            const newBullet = this.bulletFactory.createBullet(this.x - 35, this.y + 38, 26, 26, -20);
            this.bulletList.push(newBullet);
          }
          break;
        case HUNTER_IDLE_RIGHT:
          this.status = HUNTER_SHOOTING_RIGHT;
          if (this.bulletCounter.counter > 0) {
            this.shootingSound.play();
            this.bulletCounter.counter--;
            const newBullet = this.bulletFactory.createBullet(this.x + 69, this.y + 38, 26, 26, 20);
            this.bulletList.push(newBullet);
          }
          break;
      }
      this.frameRate = 6;
      this.startShootingTime = time;
    }

    // Jumping
    if (keys.ArrowUp && this.jumpCount < MAX_JUMP_TIMES) {
      this.vy = -20;
      this.jumpCount++;
    }
  }

  handleCollisionWithPad(pad) {
    const delta = 30;

    // If the hunter is colliding with a pad
    if (this.y + this.height < pad.y + delta) {
      // If the hunter is standing on the pad
      this.y = pad.y - this.height + 10;
      return pad;
    } else {
      // hunter is colliding with pad from side
      if (pad.y + pad.height < this.y + delta) {
        // bottom
        this.y = pad.y + pad.height;
      } else if (this.x + this.width < pad.x + delta) {
        // left side
        this.x = pad.x - this.width;
      } else if (pad.x + pad.width < this.x + delta) {
        // right
        this.x = pad.x + pad.width;
      }
    }
    return null;
  }
}
