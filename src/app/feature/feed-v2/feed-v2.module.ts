import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedV2Component } from './feed-v2.component';
import { FeedRoutingModule } from './feed-v2-routing.module';
import { MaterialModule } from '../../material.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { CardHorarioModule } from '../../components/card-horario/card-horario.module'

@NgModule({
  declarations: [FeedV2Component],
  imports: [
    CommonModule,
    FeedRoutingModule,
    MaterialModule,
    ToolbarModule,
    CardHorarioModule
  ],  
})
export class FeedV2Module {}
