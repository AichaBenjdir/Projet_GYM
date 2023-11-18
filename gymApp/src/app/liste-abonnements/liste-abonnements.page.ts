import { Component, OnInit } from '@angular/core';
import { NavController , ToastController, AlertController } from '@ionic/angular';
import Parse from 'parse';

@Component({
  selector: 'app-liste-abonnements',
  templateUrl: './liste-abonnements.page.html',
  styleUrls: ['./liste-abonnements.page.scss'],
})
export class ListeAbonnementsPage implements OnInit {

  Abonnements: Array<any>;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) { 
    //this.getAbonnements()
  }

  async getAbonnements(){
    this.Abonnements = []
    var q= new Parse.Query("Abonnements");

    q.equalTo("adherent", Parse.User.current().get('adherent'))

    q.include("discipline")

    const abonnements = await q.find();

    for (let i = 0; i < abonnements.length; i++) {
      var object = abonnements[i];
      this.Abonnements.push({
        abonnement: object,
        id: object.id,
        discipline: object.get('discipline').get('nom'),
        mois: object.get('mois'),
        option: object.get('option'),
        nbr_seances: object.get('nbr_seances')        
      });
    } 

    console.log(this.Abonnements)
  }

  async etatForfait(i){
    const alert = await this.alertCtrl.create({
      header: "Etat de l'abonnement",
      subHeader: "Il vous reste",
      message: this.Abonnements[i].nbr_seances+" séances",
      buttons: ['OK']
    });

    await alert.present();
  }

  goToAbonnements(){
    this.navCtrl.navigateForward('ajouter-abonnement')    
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getAbonnements()
  }

}
