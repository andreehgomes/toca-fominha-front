import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHorarioComponent } from './card-horario.component';
import { MaterialModule } from '../../material.module';


@NgModule({
  declarations: [CardHorarioComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [CardHorarioComponent]
})
export class CardHorarioModule { }
