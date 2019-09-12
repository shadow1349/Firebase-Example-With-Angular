import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/main/notes', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  {
    path: '404',
    loadChildren: () => import('./not-found/not-found.module').then(mod => mod.NotFoundModule)
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
