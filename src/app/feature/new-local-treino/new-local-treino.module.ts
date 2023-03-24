import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewLocalTreinoComponent } from './new-local-treino.component';
import { NewLocalTreinoRoutingModule } from './new-local-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { CardAlertModule } from 'src/app/components/card-alert/card-alert.module';
import { InputMoedaModule } from 'src/app/components/input-moeda/input-moeda.module';



@NgModule({
  declarations: [
    NewLocalTreinoComponent
  ],
  imports: [
    CommonModule,
    NewLocalTreinoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    ToolbarModule,
    CardAlertModule,
    InputMoedaModule
  ]
})
export class NewLocalTreinoModule { }
