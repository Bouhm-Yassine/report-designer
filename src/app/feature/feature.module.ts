import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'templates',
    loadChildren: () => import('./pages/templates/templates.module').then(m => m.TemplatesModule),
  },
  {
    path: '',
    redirectTo: '/templates',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FeatureModule { }
