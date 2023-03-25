import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPagamentoComponent } from './card-pagamento.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    CardPagamentoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [CardPagamentoComponent]
})
export class CardPagamentoModule { }
