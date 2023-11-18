import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AjouterSeancePage } from './ajouter-seance.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterSeancePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AjouterSeancePage]
})
export class AjouterSeancePageModule {}
