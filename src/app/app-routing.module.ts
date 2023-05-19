import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'roles', component: RolesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // ... otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
