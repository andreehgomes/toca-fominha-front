import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensalidadeComponent } from './mensalidade.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMoedaModule } from 'src/app/components/input-moeda/input-moeda.module';

@NgModule({
  declarations: [MensalidadeComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, InputMoedaModule],
  exports: [MensalidadeComponent],
})
export class MensalidadeModule {}
