import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { MaterialModule } from 'src/app/material.module';
import { EmConstrucaoModule } from '../em-construcao/em-construcao.module';

@NgModule({
  declarations: [PerfilComponent],
  imports: [CommonModule, MaterialModule, EmConstrucaoModule],
  exports: [PerfilComponent],
})
export class PerfilModule {}
