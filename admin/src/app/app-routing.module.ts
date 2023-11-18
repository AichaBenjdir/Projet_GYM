import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListeDisciplinesComponent } from './liste-disciplines/liste-disciplines.component';
import { ListeAdherentsComponent } from './liste-adherents/liste-adherents.component';
import { AjouterDisciplinesComponent } from './ajouter-disciplines/ajouter-disciplines.component';
import { ListeEntraineursComponent } from './liste-entraineurs/liste-entraineurs.component';
import { AjouterEntraineursComponent } from './ajouter-entraineurs/ajouter-entraineurs.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ListeEvenementsComponent } from './liste-evenements/liste-evenements.component';
import { AjouterEvenementsComponent } from './ajouter-evenements/ajouter-evenements.component';
import { ListeGroupesComponent } from './liste-groupes/liste-groupes.component';
import { AjouterGroupeComponent } from './ajouter-groupe/ajouter-groupe.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListePlanificationsComponent } from './liste-planifications/liste-planifications.component';
import { AjouterPlanificationsComponent } from './ajouter-planifications/ajouter-planifications.component';
import { PointageMembresComponent } from './pointage-membres/pointage-membres.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path : '', component : LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot_password', component: ForgotPasswordComponent },
  { path: 'home', component: HomeComponent, children: [
    { path: '', component: AcceuilComponent },
    { path: 'liste_disciplines', component: ListeDisciplinesComponent },
    { path: 'ajouter_disciplines', component: AjouterDisciplinesComponent },
    { path: 'liste_adherents', component: ListeAdherentsComponent },
    { path: 'liste_entraineurs', component: ListeEntraineursComponent },
    { path: 'ajouter_entraineurs', component: AjouterEntraineursComponent },
    { path: 'liste_evenements', component: ListeEvenementsComponent },
    { path: 'ajouter_evenements', component: AjouterEvenementsComponent },
    { path: 'liste_groupes', component: ListeGroupesComponent },
    { path: 'ajouter_groupe', component: AjouterGroupeComponent },
    { path: 'liste_planifications', component: ListePlanificationsComponent },
    { path: 'ajouter_planifications', component: AjouterPlanificationsComponent },
    { path: 'pointage_membres', component: PointageMembresComponent },
    { path: 'profile', component: ProfileComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
