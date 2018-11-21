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

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ViewerComponent,
    ControlComponent,
    TimelineComponent,
    SettingComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule
  ],
  exports: [CommonModule, FormsModule],
  providers: [ControlService, MouseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
