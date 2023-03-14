import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmConstrucaoComponent } from './em-construcao.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    EmConstrucaoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [EmConstrucaoComponent]
})
export class EmConstrucaoModule { }
