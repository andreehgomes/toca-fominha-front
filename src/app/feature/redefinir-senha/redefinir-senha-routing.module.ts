import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedefinirSenhaComponent } from './redefinir-senha.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RedefinirSenhaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedefinirSenhaRoutinModule {}
