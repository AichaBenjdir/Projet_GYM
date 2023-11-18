import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { formatDate } from '@angular/common';
declare var Parse: any;

@Component({
  selector: 'app-pointage-membres',
  templateUrl: './pointage-membres.component.html',
  styleUrls: ['./pointage-membres.component.scss']
})
export class PointageMembresComponent implements OnInit {

  isEntraineurs: any
  typeMembres: any
  groupe: any
  Membres: Array<any>
  Groupes: Array<any>

  currentDate: any

  constructor() {
    this.currentDate = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    this.isEntraineurs = false
  }

  typeChanged(){
    if(this.typeMembres == "Adherents"){
      this.isEntraineurs = true
      this.Membres = []
      this.getGroupes()
    }else{
      this.isEntraineurs = false
      this.getMembres()
    }
    
  }

  groupeChanged(){
    this.Membres = []
    for (let i = 0; i < this.Groupes[this.groupe].adherents.length; i++) {
      var object = this.Groupes[this.groupe].adherents[i];

      this.Membres.push({
        id: object.id,
        membre: object,
        nom: object.get("name")        
      });
    } 
    
  }

  async getGroupes(){
    this.Groupes = []
    var q= new Parse.Query("Groupes");

    q.include("discipline")
    q.include("entraineur")
    q.include("adherents")

    const groupes = await q.find();

    for (let i = 0; i < groupes.length; i++) {
      var object = groupes[i];
      this.Groupes.push({
        id: object.id,
        groupe: object,
        nom: object.get('nom'),
        discipline: object.get('discipline'),
        nom_discipline: object.get('discipline').get('nom'),
        entraineur: object.get('entraineur'),
        nom_entraineur: object.get('entraineur').get('nom'),
        adherents: object.get('adherents')  
      });
    } 
  }

  async getMembres(){
    this.Membres = []
    var q= new Parse.Query(this.typeMembres);

    const membres = await q.find();

    for (let i = 0; i < membres.length; i++) {
      var object = membres[i];

      this.Membres.push({
        id: object.id,
        membre: object,
        nom: object.get("nom"),
      });
    } 
  }

  async marquerPresence(i, type){

    var typePresence = ""

    if(this.typeMembres == "Adherents"){
      typePresence = "PresenceAdherents"
    }else{
      typePresence = "PresenceEntraineurs"
    }

    var q= new Parse.Query(typePresence);
    q.equalTo("membre", this.Membres[i].membre)
    q.equalTo("date", this.currentDate)
    q.count().then((count) => {
      if(count==0){
        var Presence = new Parse.Object.extend(typePresence);
        const presence = new Presence();
        presence.set("membre", this.Membres[i].membre)
        presence.set("date", this.currentDate)
        if (type == "present"){
          presence.set("isPresent", true)
        }else if(type == "absent"){
          presence.set("isPresent", false)
        }
        presence.save().then((pres) => {
          alert("Présence marqué avec succés!") 
          
          if(this.typeMembres == "Adherents"){
            var q1 = new Parse.Query("Abonnements");
            q1.equalTo("adherent", this.Membres[i].membre)
            q1.equalTo("discipline", this.Groupes[this.groupe].discipline)
            q1.find().then((abonnements) =>{
              abonnements[0].increment("nbr_seances", -1)
              abonnements[0].save()
            });

          }
          
        }, (error) => {
          alert('Failed to create new object, with error code: ' + error.message);
        });

      }else{
        alert("Vous avez déjà marqué le présence de ce membre!")
      }
    });
  }

  ngOnInit() {
  }

}
