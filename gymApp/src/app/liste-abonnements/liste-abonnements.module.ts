import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListeAbonnementsPage } from './liste-abonnements.page';

const routes: Routes = [
  {
    path: '',
    component: ListeAbonnementsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListeAbonnementsPage]
})
export class ListeAbonnementsPageModule {}
