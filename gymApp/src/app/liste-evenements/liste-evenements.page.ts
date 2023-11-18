import { Component, OnInit } from '@angular/core';
import { NavController , ToastController, AlertController } from '@ionic/angular';

import Parse from 'parse';

@Component({
  selector: 'app-liste-evenements',
  templateUrl: './liste-evenements.page.html',
  styleUrls: ['./liste-evenements.page.scss'],
})
export class ListeEvenementsPage implements OnInit {

  Evenements: Array<any>;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) { 
    //this.getAbonnements()
  }

  async getEvenements(){
    this.Evenements = []
    var q= new Parse.Query("Evenements");

    const evenements = await q.find();

    for (let i = 0; i < evenements.length; i++) {
      var object = evenements[i];
      this.Evenements.push({
        evenement: object,
        id: object.id,
        nom: object.get('nom'),
        date: object.get('date'),
        heure: object.get('heure'),
        lieu: object.get('lieu'),
        description: object.get('description')        
      });
    } 
  }

  participer(i){
    var Participation = new Parse.Object.extend("ParticipationEvenements");
    const participation = new Participation();
    participation.set("adherent", Parse.User.current().get('adherent'))
    participation.set("evenement", this.Evenements[i].evenement)
    participation.save().then((ent) => {
      this.toastFun("Votre participation est enregistrée avec succés")
    }, (error) => {
      this.toastFun(error.message)
    });
  }

  async description(i){
    const alert = await this.alertCtrl.create({
      header: this.Evenements[i].nom,
      subHeader: this.Evenements[i].lieu,
      message: this.Evenements[i].description,
      buttons: ['OK']
    });

    await alert.present();
  }

  async toastFun(msg: string){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getEvenements()
  }

}
