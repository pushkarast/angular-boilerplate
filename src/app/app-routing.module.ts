import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    data: { name: 'default', modules: ['all'] },
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'superAdmin',
    loadChildren: () =>
      import('./super-admin/super-admin.module').then(
        (m) => m.SuperAdminModule
      ),
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
