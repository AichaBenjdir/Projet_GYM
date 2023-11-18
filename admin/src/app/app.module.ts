import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { NgxFileHelpersModule } from 'ngx-file-helpers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListeDisciplinesComponent,
    ListeAdherentsComponent,
    AjouterDisciplinesComponent,
    ListeEntraineursComponent,
    AjouterEntraineursComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ListeEvenementsComponent,
    AjouterEvenementsComponent,
    ListeGroupesComponent,
    AjouterGroupeComponent,
    AcceuilComponent,
    ListePlanificationsComponent,
    AjouterPlanificationsComponent,
    PointageMembresComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    NgxFileHelpersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
