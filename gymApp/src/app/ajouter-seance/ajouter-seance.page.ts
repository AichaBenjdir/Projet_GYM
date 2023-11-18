import { Component, OnInit } from '@angular/core';
import { NavController , ToastController } from '@ionic/angular';
import Parse from 'parse';

@Component({
  selector: 'app-ajouter-seance',
  templateUrl: './ajouter-seance.page.html',
  styleUrls: ['./ajouter-seance.page.scss'],
})
export class AjouterSeancePage implements OnInit {

  Disciplines: Array<any>;
  myDate: any;
  myDiscipline: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
    this.getDisciplines()
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
    var Abonnement = new Parse.Object.extend("Seances");
    const abonnement = new Abonnement();
    abonnement.set("discipline", this.myDiscipline.discipline)
    abonnement.set("date", this.myDate)
    abonnement.set("adherent", Parse.User.current().get('adherent'))
    abonnement.save().then((ent) => {
      this.myDiscipline = ""
      this.myDate = ""  
      this.navCtrl.navigateBack('liste-seances')
    }, (error) => {
      alert('Failed to create new object, with error code: ' + error.message);
    });

  }

  ngOnInit() {
  }

}
