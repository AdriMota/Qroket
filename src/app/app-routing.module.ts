import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout/layout.page';
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    // Default route
    path: "",
    // Add the guard to the canActivate array of this route
    canActivate: [AuthGuard],
    loadChildren: () => import("./layout/layout.module").then(m => m.LayoutPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
