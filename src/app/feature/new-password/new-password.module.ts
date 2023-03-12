import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPasswordComponent } from './new-password.component';
import { NewPasswordRoutingModule } from './new-password-routing.module';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterModule } from '../../components/footer/footer.module';
import { ToolbarModule } from 'src/app/components/toolbar/toolbar.module';
import { CardAlertModule } from 'src/app/components/card-alert/card-alert.module';

@NgModule({
  declarations: [
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    NewPasswordRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    ToolbarModule,
    CardAlertModule
  ]
})
export class NewPasswordModule { }
