import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
