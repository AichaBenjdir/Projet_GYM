import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AjouterPublicationModalPage } from './ajouter-publication-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterPublicationModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AjouterPublicationModalPage]
})
export class AjouterPublicationModalPageModule {}
