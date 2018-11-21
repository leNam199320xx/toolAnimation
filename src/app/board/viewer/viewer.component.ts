import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ControlService } from 'src/app/core/service/control.service';
import { Box } from 'src/app/core/model/box.model';
import { Circle } from 'src/app/core/shape/circle';
import { Rectangle } from 'src/app/core/shape/rectangle';
import { Img } from 'src/app/core/shape/img';
import { NodeModel } from 'src/app/core/model/node.model';
import { MouseService } from 'src/app/core/service/mouse.service';

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
    private mouseService: MouseService
  ) { }

  ngOnInit() {
    this.viewBox = this.controlService.viewBox;
    this.sizeBox = this.controlService.sizeBox;
    this.controlService.onChange.subscribe(res => {
      this.ngAfterViewInit();
    });

    this.controlService.onGetTemplate.subscribe(res => {
      if (res) {
        this.addElement(res);
      }
    });

  }

  ngAfterViewInit() {
    this.svg = this.viewBoxSvg.nativeElement;
    this.svg.setAttribute('height', this.sizeBox.height.toString());
    this.svg.setAttribute('width', this.sizeBox.width.toString());
    this.mouseService.setup(this.svg);
  }

  addElement(_node: NodeModel) {
    if (_node.text === 'rect') {
      const _re = new Rectangle();
      this.svg.appendChild(_re.svgElement);
    }

    if (_node.text === 'circle') {
      const _re = new Circle();
      this.svg.appendChild(_re.svgElement);
    }

    if (_node.text.indexOf('image') > - 1) {
      const _re = new Img();
      this.svg.appendChild(_re.svgElement);
    }
  }
}
