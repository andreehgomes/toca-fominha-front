import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedefinirSenhaComponent } from './redefinir-senha.component';
import { MaterialModule } from 'src/app/material.module';
import { RedefinirSenhaRoutinModule } from './redefinir-senha-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from 'src/app/components/footer/footer.module';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { CardAlertModule } from 'src/app/components/card-alert/card-alert.module';

@NgModule({
  declarations: [RedefinirSenhaComponent],
  imports: [
    CommonModule,
    RedefinirSenhaRoutinModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    ToolbarModule,
    CardAlertModule
  ],
})
export class RedefinirSenhaModule {}
