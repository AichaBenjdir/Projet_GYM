import { Component, OnInit } from '@angular/core';
import { NavController , ToastController } from '@ionic/angular';
import Parse from 'parse';

@Component({
  selector: 'app-liste-seances',
  templateUrl: './liste-seances.page.html',
  styleUrls: ['./liste-seances.page.scss'],
})
export class ListeSeancesPage implements OnInit {

  Seances: Array<any>;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) { 
    //this.getSeances()
  }

  async getSeances(){
    this.Seances = []
    var q= new Parse.Query("Seances");

    q.equalTo("adherent", Parse.User.current().get('adherent'))

    q.include("discipline")

    const seances = await q.find();

    for (let i = 0; i < seances.length; i++) {
      var object = seances[i];
      this.Seances.push({
        seance: object,
        id: object.id,
        discipline: object.get('discipline').get('nom'),
        date: object.get('date')     
      });
    } 
  }

  goToSeances(){
    this.navCtrl.navigateForward('ajouter-seance')    
  }



  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getSeances()
  }

}
