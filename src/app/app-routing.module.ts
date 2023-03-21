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
      import('../app/feature/page-error/page-error.module').then(
        (m) => m.PageErrorModule
      ),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('../app/feature/feed/feed.module').then((m) => m.FeedModule),
  },
  {
    path: 'feed-v2',
    loadChildren: () =>
      import('../app/feature/feed-v2/feed-v2.module').then(
        (m) => m.FeedV2Module
      ),
  },
  {
    path: 'new-password',
    loadChildren: () =>
      import('../app/feature/new-password/new-password.module').then(
        (m) => m.NewPasswordModule
      ),
  },
  {
    path: 'new-account',
    loadChildren: () =>
      import('../app/feature/new-account/new-account.module').then(
        (m) => m.NewAccountModule
      ),
  },
  {
    path: 'pagamento',
    loadChildren: () =>
      import('./feature/pagamento/pagamento.module').then(
        (m) => m.PagamentoModule
      ),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./feature/redefinir-senha/redefinir-senha.module').then(
        (m) => m.RedefinirSenhaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
