import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../app/feature/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('../app/feature/page-error/page-error.module').then((m) => m.PageErrorModule),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('../app/feature/feed/feed.module').then((m) => m.FeedModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
