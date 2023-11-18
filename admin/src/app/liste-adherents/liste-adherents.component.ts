import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;

@Component({
  selector: 'app-liste-adherents',
  templateUrl: './liste-adherents.component.html',
  styleUrls: ['./liste-adherents.component.scss']
})
export class ListeAdherentsComponent implements OnInit {

  Adherents: Array<any>;
  Groupes: Array<any>;
  Abonnements: Array<any>;
  Absences: Array<any>;
  nb_presences: any;
  nb_absences: any;

  constructor(private router: Router) { 
    this.getAdherents()
  }

  async getAdherents(){
    this.Adherents = []
    var q= new Parse.Query("Adherents");

    const adherents = await q.find();

    for (let i = 0; i < adherents.length; i++) {
      var object = adherents[i];
      this.Adherents.push({
        id: object.id,
        adherent: object,
        nom: object.get('name'),
        cin: object.get('cin') ,
        telephone: object.get('num_tel'),
        date_naissance: object.get('birth_date'),
        sexe: object.get('sexe')           
      });
    } 
  }

  async afficherGroupes(j){
    this.Groupes = []
    var q= new Parse.Query("Groupes");

    q.equalTo("adherents", this.Adherents[j].adherent)

    q.include("adherents")
    q.include("entraineur")

    const groupes = await q.find();

    for (let i = 0; i < groupes.length; i++) {
      var object = groupes[i];
      this.Groupes.push({
        groupe: object,
        id: object.id,
        nom: object.get('nom'),
        entraienur: object.get('entraineur'),
        nom_entraineur: object.get('entraineur').get('nom'),
        adherents: object.get('adherents')           
      });
    } 
  }

  async afficherAbonnements(j){
    this.Abonnements = []
    var q= new Parse.Query("Abonnements");

    q.equalTo("adherent", this.Adherents[j].adherent)

    q.include("discipline")

    const abonnements = await q.find();

    for (let i = 0; i < abonnements.length; i++) {
      var object = abonnements[i];
      this.Abonnements.push({
        abonnement: object,
        id: object.id,
        discipline: object.get('discipline'),
        nom_discipline: object.get('discipline').get('nom'),
        mois: object.get('mois'),
        option: object.get('option')     
      });
    } 
  }

  async afficherAbsence(j){
    this.Absences = []
    var q= new Parse.Query("PresenceAdherents");

    q.equalTo("membre", this.Adherents[j].adherent)

    const absences = await q.find();

    this.nb_absences = 0
    this.nb_presences = 0
    var e = ""

    for (let i = 0; i < absences.length; i++) {
      var object = absences[i];
      if(object.get('isPresent') == true){
        e = 'Présent'
        this.nb_presences +=1
      }else{
        e = 'Absent'
        this.nb_absences +=1
      }
      this.Absences.push({
        absence: object,
        id: object.id,
        date: object.get('date'),
        etat: e     
      });
    } 
  }


  supprimer(id, i){
    var q= new Parse.Query("Adherents");
    q.get(id).then((obj) => {
      obj.destroy().then((myobj)=>{
        this.Adherents.splice(i,1);
      }); 
    });
  }

  ngOnInit() {
  }

}
