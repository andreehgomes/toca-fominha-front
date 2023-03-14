import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreinosComponent } from './treinos.component';
import { MaterialModule } from 'src/app/material.module';
import { EmConstrucaoModule } from '../em-construcao/em-construcao.module';



@NgModule({
  declarations: [
    TreinosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EmConstrucaoModule
  ],
  exports: [
    TreinosComponent
  ]
})
export class TreinosModule { }
