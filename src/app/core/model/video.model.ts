export class Video {
    height: number;
    width: number;
    frameRate: number;
    frameCount: number;
    currentFrame: number;
    endTime: number; // miliseconds
    tickTime: number;
    isPlay = false;
    setting() {
        this.frameRate = this.frameRate || 24;
        this.endTime = this.endTime || 10000;
        this.tickTime = 1000 / this.frameRate;
        this.frameCount = Math.ceil(this.endTime / this.tickTime);
    }

    calculateFrame(_distanceTime: number) {
        if (_distanceTime && _distanceTime >= 0) {
            this.currentFrame = Math.ceil(_distanceTime / this.tickTime);
            this.isPlay = this.currentFrame < this.frameCount;
        } else {
            this.isPlay = false;
        }
    }
}
