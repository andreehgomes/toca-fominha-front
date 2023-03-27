import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreinosComponent } from './treinos.component';
import { MaterialModule } from 'src/app/material.module';
import { EmConstrucaoModule } from '../em-construcao/em-construcao.module';
import { CardHorarioModule } from 'src/app/components/card-horario/card-horario.module';



@NgModule({
  declarations: [
    TreinosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CardHorarioModule
  ],
  exports: [
    TreinosComponent
  ]
})
export class TreinosModule { }
