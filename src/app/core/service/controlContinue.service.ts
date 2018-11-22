import { Injectable } from '@angular/core';
import { Timer } from '../model/timer.model';
import { Video } from '../model/video.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ControlContinueService {
    timer = new Timer();
    video = new Video();
    isRunning = false;
    onChange: BehaviorSubject<number>;
    onStop: BehaviorSubject<boolean>;
    oldFrame = -1;
    index = 0;

    constructor() {
        this.onChange = new BehaviorSubject(null);
        this.onStop = new BehaviorSubject(null);
        this.video.setting();
    }

    render() {
        this.timer.end = Date.now();
        this.timer.distanceTime = 0;
        if (!this.timer.start) {
            this.timer.start = Date.now() - (this.video.currentFrame * this.video.tickTime || 0);
        }
        this.timer.distanceTime = this.timer.end - (this.timer.start || this.timer.end);

        if (this.timer.end && this.timer.start && this.isRunning) {
            this.tick();
        }
    }

    tick() {
        this.video.setFrame(this.timer.distanceTime);
        if (this.oldFrame !== this.video.currentFrame) {
            this.onChange.next(this.video.currentFrame);
        }
        this.oldFrame = this.video.currentFrame;
        this.index = requestAnimationFrame(this.render.bind(this));
    }

    start() {
        this.isRunning = true;
        this.onStop.next(!this.isRunning);
        this.index = requestAnimationFrame(this.render.bind(this));
    }

    stop() {
        this.isRunning = false;
        this.timer.start = null;
        this.timer.end = null;
        cancelAnimationFrame(this.index);
        this.onStop.next(!this.isRunning);
    }
}
