import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListeEvenementsPage } from './liste-evenements.page';

const routes: Routes = [
  {
    path: '',
    component: ListeEvenementsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListeEvenementsPage]
})
export class ListeEvenementsPageModule {}
