import { Component, OnInit } from '@angular/core';
import { NavController , ToastController } from '@ionic/angular';
import Parse from 'parse';

@Component({
  selector: 'app-ajouter-abonnement',
  templateUrl: './ajouter-abonnement.page.html',
  styleUrls: ['./ajouter-abonnement.page.scss'],
})
export class AjouterAbonnementPage implements OnInit {

  Disciplines: Array<any>;
  myDisc: any;
  myDiscipline: any;
  mois: any;
  option: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
    this.getDisciplines()

    console.log(this.myDiscipline)
   }

  async getDisciplines(){
    this.Disciplines = []
    var q= new Parse.Query("Disciplines");

    q.include("entraineur")

    const disciplines = await q.find();

    for (let i = 0; i < disciplines.length; i++) {
      var object = disciplines[i];
      this.Disciplines.push({
        discipline: object,
        id: object.id,
        nom: object.get('nom'),
        entraineur: object.get('entraineur').get('nom')           
      });
    } 
  }

  confirm(){
    var Abonnement = new Parse.Object.extend("Abonnements");
    const abonnement = new Abonnement();
    abonnement.set("discipline", this.myDiscipline.discipline)
    abonnement.set("mois", this.mois)
    abonnement.set("option", this.option)
    abonnement.set("adherent", Parse.User.current().get('adherent'))
    abonnement.save().then((ent) => {
      this.myDiscipline = ""
      this.mois = ""  
      this.navCtrl.navigateBack('liste-abonnements')  
    }, (error) => {
      alert('Failed to create new object, with error code: ' + error.message);
    });

  }

  optionsFn(){
    this.myDisc = this.myDiscipline
    console.log(this.myDiscipline)
  }


  ngOnInit() {
  }

}
