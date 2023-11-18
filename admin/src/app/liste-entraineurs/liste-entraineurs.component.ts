import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;

@Component({
  selector: 'app-liste-entraineurs',
  templateUrl: './liste-entraineurs.component.html',
  styleUrls: ['./liste-entraineurs.component.scss']
})
export class ListeEntraineursComponent implements OnInit {

  Entraineurs: Array<any>;
  Disciplines: Array<any>;
  Groupes: Array<any>;
  Absences: Array<any>;
  nb_presences: any;
  nb_absences: any;

  constructor(private router: Router) { 
    this.getEntraineurs()
  }

  async getEntraineurs(){
    this.Entraineurs = []
    var q= new Parse.Query("Entraineurs");

    const entraineurs = await q.find();

    for (let i = 0; i < entraineurs.length; i++) {
      var object = entraineurs[i];
      this.Entraineurs.push({
        id: object.id,
        entraineur: object,
        nom: object.get('nom'),
        cin: object.get('cin') ,
        telephone: object.get('telephone'),
        sexe: object.get('sexe'),           
        specialite: object.get('specialite'),
        diplome: object.get('diplome')
      });
    } 
  }

  async afficherDisciplines(j){
    this.Disciplines = []
    var q= new Parse.Query("Disciplines");

    q.equalTo("entraineurs", this.Entraineurs[j].entraineur)

    const disciplines = await q.find();

    for (let i = 0; i < disciplines.length; i++) {
      var object = disciplines[i];
      this.Disciplines.push({
        discipline: object,
        id: object.id,
        nom: object.get('nom')        
      });
    } 
  }

  async afficherGroupes(j){
    this.Groupes = []
    var q= new Parse.Query("Groupes");

    q.equalTo("entraineur", this.Entraineurs[j].entraineur)

    q.include("discipline")

    const groupes = await q.find();

    for (let i = 0; i < groupes.length; i++) {
      var object = groupes[i];
      this.Groupes.push({
        groupe: object,
        id: object.id,
        nom: object.get('nom'),
        discipline: object.get('discipline'),
        nom_discipline: object.get('discipline').get('nom')
      });
    } 
  }

  async afficherAbsence(j){
    this.Absences = []
    var q= new Parse.Query("PresenceEntraineurs");

    q.equalTo("membre", this.Entraineurs[j].entraineur)

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

  goToAddPage(){
    this.router.navigate(['home/ajouter_entraineurs']);
  }

  supprimer(id, i){
    var q= new Parse.Query("Entraineurs");
    q.get(id).then((obj) => {
      obj.destroy().then((myobj)=>{
        this.Entraineurs.splice(i,1);
      }); 
    });
  }

  ngOnInit() {
  }

}
