import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { ViewerComponent } from './board/viewer/viewer.component';
import { ControlComponent } from './board/control/control.component';
import { ControlService } from './core/service/control.service';
import { TimelineComponent } from './board/control/timeline/timeline.component';
import { SettingComponent } from './board/control/setting/setting.component';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './board/template/template.component';
import { MouseService } from './core/service/mouse.service';
import { ShapeService } from './core/service/shape.service';
import { ControlContinueService } from './core/service/controlContinue.service';
import { ShapeComponent } from './board/control/shape/shape.component';
import { LeftControlComponent } from './board/left-control/left-control.component';

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        ViewerComponent,
        ControlComponent,
        TimelineComponent,
        SettingComponent,
        TemplateComponent,
        ShapeComponent,
        LeftControlComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule
    ],
    exports: [CommonModule, FormsModule],
    providers: [ControlService, ControlContinueService, MouseService, ShapeService],
    bootstrap: [AppComponent]
})
export class AppModule { }
