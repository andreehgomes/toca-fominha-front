import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceiroComponent } from './financeiro.component';
import { MaterialModule } from 'src/app/material.module';
import { EmConstrucaoComponent } from '../em-construcao/em-construcao.component';
import { EmConstrucaoModule } from '../em-construcao/em-construcao.module';



@NgModule({
  declarations: [
    FinanceiroComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EmConstrucaoModule
  ],
  exports: [FinanceiroComponent]
})
export class FinanceiroModule { }
