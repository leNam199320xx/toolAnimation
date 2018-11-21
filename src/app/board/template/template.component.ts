import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NodeModel } from 'src/app/core/model/node.model';
import { ControlService } from 'src/app/core/service/control.service';

@Component({
    selector: 'app-template',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

    templateElements: NodeModel[] = [];

    constructor(public controlService: ControlService) { }

    ngOnInit() {
        this.templateElements = [
            new NodeModel('rect', 0),
            new NodeModel('circle', 1),
            new NodeModel('image 1', 2),
            new NodeModel('image 2', 3)
        ];
    }

    btnTemplate(_node: NodeModel) {
        this.controlService.onGetTemplate.next(_node);
    }

}
