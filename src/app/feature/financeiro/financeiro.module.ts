import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceiroComponent } from './financeiro.component';
import { MaterialModule } from 'src/app/material.module';
import { EmConstrucaoComponent } from '../em-construcao/em-construcao.component';
import { EmConstrucaoModule } from '../em-construcao/em-construcao.module';
import { CardPagamentoModule } from 'src/app/components/card-pagamento/card-pagamento.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FinanceiroComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EmConstrucaoModule,
    CardPagamentoModule,
    FormsModule
  ],
  exports: [FinanceiroComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class FinanceiroModule { }
