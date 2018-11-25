import { Injectable } from '@angular/core';
import { Box } from '../model/box.model';
import { Frame } from '../model/frame.model';
import { Video } from '../model/video.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Timer } from '../model/timer.model';
import { NodeModel } from '../model/node.model';

@Injectable()
export class ControlService {
    viewBox = new Box();
    sizeBox = new Box();
    video = new Video();
    timer = new Timer();
    keyframes: Frame[] = [];
    currentKey: Frame = new Frame();
    index = -1;
    oldIndex = -1;
    isRunning = false;
    onChangeSetting: BehaviorSubject<ControlService> = new BehaviorSubject(null);
    onGetTemplate: BehaviorSubject<NodeModel> = new BehaviorSubject(null);
    onChangeFrame: BehaviorSubject<number> = new BehaviorSubject(null);
    onEnd: BehaviorSubject<ControlService> = new BehaviorSubject(null);
    constructor() {
        this.sizeBox.x = 0;
        this.sizeBox.y = 0;
        this.sizeBox.width = 800;
        this.sizeBox.height = 600;
    }

    settingVideo() {
        this.keyframes = [];
        this.video.height = this.sizeBox.height;
        this.video.width = this.sizeBox.width;
        this.video.setting();
        for (let i = 0; i < this.video.frameCount; i++) {
            const _frame = new Frame();
            _frame.active = i === 0;
            // _frame.value = i + 1;
            _frame.index = i;
            this.keyframes.push(_frame);
        }
        this.index = 0;
        this.currentKey = this.keyframes.length > 0 ? this.keyframes[0] : this.currentKey;
        this.onChangeSetting.next(this);
    }

    setKey(_inx: number = this.index) {
        this.index = _inx || 0;
        if (this.keyframes.length > 0) {
            if (this.index < 0) {
                this.index = 0;
            }
            if (this.index >= this.keyframes.length - 1) {
                this.index = this.keyframes.length - 1;
            }
            this.currentKey.active = false;
            this.video.currentFrame = this.index + 1;
            this.currentKey = this.keyframes[this.index];

            if (this.index !== this.oldIndex) {
                this.onChangeFrame.next(this.video.currentFrame);
            }
        } else {
            this.index = -1;
            this.currentKey = new Frame();
        }
        if (this.currentKey) {
            this.currentKey.active = true;
        }
        this.oldIndex = this.index;
    }

    setKeyWhenRunning(_inx: number = this.index) {
        if (_inx < 1) {
            _inx = 1;
        }
        if (_inx >= this.keyframes.length) {
            _inx = this.keyframes.length - 1;
        }
        this.index = _inx;
        this.video.currentFrame = this.index;
        this.timer.start = Date.now() - (this.video.currentFrame * this.video.tickTime || 0);
        this.timer.end = Date.now();
    }

    nextFrame() {
        this.index = this.index + 1;
        this.setKey();
    }

    backFrame() {
        this.index = this.index - 1;
        this.setKey();
    }

    render() {
        this.timer.end = Date.now();
        this.timer.distanceTime = 0;
        if (!this.timer.start) {
            this.timer.start = Date.now() - (this.video.currentFrame * this.video.tickTime || 0);
        }
        this.timer.distanceTime = this.timer.end - (this.timer.start || this.timer.end);

        if (this.timer.end && this.timer.start) {
            if (this.isRunning) {
                this.tick();
                requestAnimationFrame(this.render.bind(this));
            } else {
                this.timer.start = null;
                this.timer.end = null;
            }

        }
    }

    output() {
    }

    tick() {
        this.video.calculateFrame(this.timer.distanceTime);
        this.setKey(this.video.currentFrame - 1);
        if (this.video.currentFrame >= this.video.frameCount) {
            this.isRunning = false;
            this.onEnd.next(this);
        }
    }

    start() {
        this.isRunning = !this.isRunning;
        if (this.isRunning) {
            requestAnimationFrame(this.render.bind(this));
        }
    }

    stop() {
        this.isRunning = false;
        this.index = 0;
        this.video.currentFrame = 0;
        this.setKey();
    }
}
