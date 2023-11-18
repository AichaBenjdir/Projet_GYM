import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'ajouter-abonnement', loadChildren: './ajouter-abonnement/ajouter-abonnement.module#AjouterAbonnementPageModule' },
  { path: 'ajouter-seance', loadChildren: './ajouter-seance/ajouter-seance.module#AjouterSeancePageModule' },
  { path: 'liste-abonnements', loadChildren: './liste-abonnements/liste-abonnements.module#ListeAbonnementsPageModule' },
  { path: 'liste-seances', loadChildren: './liste-seances/liste-seances.module#ListeSeancesPageModule' },
  { path: 'liste-evenements', loadChildren: './liste-evenements/liste-evenements.module#ListeEvenementsPageModule' },
  { path: 'evenement-details', loadChildren: './evenement-details/evenement-details.module#EvenementDetailsPageModule' },
  { path: 'ajouter-publication-modal', loadChildren: './ajouter-publication-modal/ajouter-publication-modal.module#AjouterPublicationModalPageModule' },
  { path: 'mon-profile', loadChildren: './mon-profile/mon-profile.module#MonProfilePageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
