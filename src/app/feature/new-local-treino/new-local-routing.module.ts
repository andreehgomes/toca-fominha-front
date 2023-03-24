import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewLocalTreinoComponent } from './new-local-treino.component'


const routes: Routes = [{
    path: '',
    component: NewLocalTreinoComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewLocalTreinoRoutingModule {
}
