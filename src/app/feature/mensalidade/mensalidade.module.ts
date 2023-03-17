import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensalidadeComponent } from './mensalidade.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputMoedaModule } from 'src/app/components/input-moeda/input-moeda.module';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { MensalidadeRoutingModule } from './mensalidade-routing.module';
import { CardAlertModule } from 'src/app/components/card-alert/card-alert.module';

@NgModule({
  declarations: [MensalidadeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    InputMoedaModule,
    ToolbarModule,
    FooterModule,
    MensalidadeRoutingModule,
    CardAlertModule
  ],
  exports: [MensalidadeComponent],
})
export class MensalidadeModule {}
