import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';
import { Box } from 'src/app/core/model/box.model';
import { MouseService } from 'src/app/core/service/mouse.service';
import { ShapeService } from 'src/app/core/service/shape.service';

@Component({
    selector: 'app-viewer',
    templateUrl: './viewer.component.html',
    styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, AfterViewInit {

    viewBox: Box;
    sizeBox: Box;
    svg: SVGSVGElement;

    @ViewChild('viewBoxSvg') viewBoxSvg: ElementRef;

    constructor(
        public controlService: ControlService,
        private mouseService: MouseService,
        private shapeService: ShapeService
    ) { }

    ngOnInit() {
        this.viewBox = this.controlService.viewBox;
        this.sizeBox = this.controlService.sizeBox;
        this.controlService.onChangeSetting.subscribe(res => {
            this.ngAfterViewInit();
        });
        this.controlService.onGetTemplate.subscribe(res => {
            if (res) {
                this.shapeService.createShape(res);
            }
        });
        this.shapeService.onSelectFinger.subscribe(res => {
            if (res) {
                if (this.mouseService.enabled) {
                    this.mouseService.setFingerToDrag(res);
                    this.shapeService.showAll();
                } else {
                    this.shapeService.resetAll();

                }
            }
        });
    }

    ngAfterViewInit() {
        this.svg = this.viewBoxSvg.nativeElement;
        this.svg.setAttribute('height', this.sizeBox.height.toString());
        this.svg.setAttribute('width', this.sizeBox.width.toString());
        this.mouseService.setup(this.svg);
        this.shapeService.svg = this.svg;
        this.shapeService.startX = this.controlService.sizeBox.width / 2;
        this.shapeService.startY = this.controlService.sizeBox.height / 2;
    }
}
