import { Injectable } from '@angular/core';
import { Box } from '../model/box.model';
import { Frame } from '../model/frame.model';
import { Video } from '../model/video.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Timer } from '../model/timer.model';

@Injectable()
export class ControlService {
    viewBox = new Box();
    sizeBox = new Box();
    video = new Video();
    timer = new Timer();
    keys: Frame[] = [];
    currentKey: Frame = new Frame();
    index = -1;
    isRunning = false;
    onChange: BehaviorSubject<ControlService>;

    constructor() {
        this.sizeBox.x = 0;
        this.sizeBox.y = 0;
        this.sizeBox.width = 800;
        this.sizeBox.height = 600;
        this.onChange = new BehaviorSubject(this);
    }

    settingVideo() {
        this.keys = [];
        this.video.height = this.sizeBox.height;
        this.video.width = this.sizeBox.width;
        this.video.setting();
        for (let i = 0; i < this.video.frameCount; i++) {
            const _frame = new Frame();
            _frame.active = i === 0;
            // _frame.value = i + 1;
            _frame.index = i;
            this.keys.push(_frame);
        }
        this.index = 0;
        this.currentKey = this.keys.length > 0 ? this.keys[0] : this.currentKey;
        this.onChange.next(this);
    }

    setKey(_inx: number = this.index) {
        this.index = _inx || 0;
        if (this.keys.length > 0) {
            if (this.index < 0) {
                this.index = 0;
            }
            if (this.index >= this.keys.length - 1) {
                this.index = this.keys.length - 1;
            }
            this.currentKey.active = false;
            this.video.currentFrame = this.index + 1;
            this.currentKey = this.keys[this.index];
        } else {
            this.index = -1;
            this.currentKey = new Frame();
        }
        if (this.currentKey) {
            this.currentKey.active = true;
        }
    }

    setKeyWhenRunning(_inx: number = this.index) {
        if (_inx < 1) {
            _inx = 1;
        }
        if (_inx >= this.keys.length) {
            _inx = this.keys.length - 1;
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
        if (this.currentKey.actions.length > 0) {
            this.currentKey.actions.forEach(_key => {
                if (_key.run) {
                    _key.run();
                }
            });
        }
    }

    tick() {
        this.video.setFrame(this.timer.distanceTime);
        this.setKey(this.video.currentFrame - 1);
        if (this.video.currentFrame >= this.video.frameCount) {
            console.log('end');
            this.isRunning = false;
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
