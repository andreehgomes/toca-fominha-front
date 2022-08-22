import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedV2Component } from './feed-v2.component';


const routes: Routes = [{
    path: '',
    component: FeedV2Component
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeedRoutingModule {
}
