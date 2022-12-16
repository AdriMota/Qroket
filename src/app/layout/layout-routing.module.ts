import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'accueil',
        loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
      },
      {
        path: 'annonces',
        loadChildren: () => import('./annonces/annonces.module').then( m => m.AnnoncesPageModule)
      },
      {
        path: 'compte',
        loadChildren: () => import('./compte/compte.module').then( m => m.ComptePageModule)
      },
      {
        path: "",
        redirectTo: "accueil", 
        pathMatch: "full",
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
