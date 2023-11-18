import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AjouterAbonnementPage } from './ajouter-abonnement.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterAbonnementPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AjouterAbonnementPage]
})
export class AjouterAbonnementPageModule {}
