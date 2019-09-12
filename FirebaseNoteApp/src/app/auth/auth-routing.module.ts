import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        loadChildren: () => import('./sign-in/sign-in.module').then(mod => mod.SignInModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./sign-up/sign-up.module').then(mod => mod.SignUpModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
