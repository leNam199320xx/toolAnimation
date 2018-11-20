import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';
import { Box } from 'src/app/core/model/box.model';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent implements OnInit, AfterViewInit {

  viewBox: Box;
  sizeBox: Box;
  svg: SVGElement;

  @ViewChild('viewBoxSvg') viewBoxSvg: ElementRef;

  constructor(public controlService: ControlService) { }

  ngOnInit() {
    this.viewBox = this.controlService.viewBox;
    this.sizeBox = this.controlService.sizeBox;
    this.controlService.onChange.subscribe(res => {
      console.log('==>update layout', res);
      this.ngAfterViewInit();
    });
  }

  ngAfterViewInit() {
    this.svg = this.viewBoxSvg.nativeElement;
    this.svg.setAttribute('height', this.sizeBox.height.toString());
    this.svg.setAttribute('width', this.sizeBox.width.toString());
  }
}
