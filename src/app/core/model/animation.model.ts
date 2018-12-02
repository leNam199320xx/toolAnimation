import { AttributeSvg } from '../shape/attribute';

export class Animation {
    startFrame: number;
    endFrame: number;
    duration: number;
    durationTime: number;
    startPoint: AttributeSvg = new AttributeSvg();
    endPoint: AttributeSvg = new AttributeSvg();
    listPoints: AttributeSvg[] = [];
    stepPoint: AttributeSvg = new AttributeSvg();

    calculateAnimation() {
        if (!this.duration || !this.startFrame || this.duration < 1 || this.startFrame < 1) {
            return false;
        }
        this.stepPoint.x = (this.endPoint.x - this.startPoint.x) / this.duration;
        this.stepPoint.y = (this.endPoint.y - this.startPoint.y) / this.duration;
        this.stepPoint.scale = (this.endPoint.scale - this.startPoint.scale) / this.duration;
        this.stepPoint.rotate = (this.endPoint.rotate - this.startPoint.rotate) / this.duration;
        this.stepPoint.skew = (this.endPoint.skew - this.startPoint.skew) / this.duration;
        this.stepPoint.opacity = (this.endPoint.opacity - this.startPoint.opacity) / this.duration;
        this.endFrame = this.startFrame + this.duration - 1;
        this.startPoint.framePosition = this.startFrame;
        this.listPoints.push(this.startPoint);
        for (let i = 1; i < this.duration - 1; i++) {
            const anim = new AttributeSvg();
            anim.framePosition = i + this.startFrame;
            anim.x = this.startPoint.x + i * this.stepPoint.x;
            anim.y = this.startPoint.y + i * this.stepPoint.y;
            anim.height = this.startPoint.height + i * this.stepPoint.height;
            anim.width = this.startPoint.width + i * this.stepPoint.width;
            anim.scale = this.startPoint.scale + i * this.stepPoint.scale;
            anim.rotate = this.startPoint.rotate + i * this.stepPoint.rotate;
            anim.skew = this.startPoint.skew + i * this.stepPoint.skew;
            anim.opacity = this.startPoint.opacity + i * this.stepPoint.opacity;
            this.listPoints.push(anim);
        }
        this.endPoint.framePosition = this.duration;
        this.listPoints.push(this.endPoint);
        return true;
    }
}
