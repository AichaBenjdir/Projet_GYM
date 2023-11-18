import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;

@Component({
  selector: 'app-liste-disciplines',
  templateUrl: './liste-disciplines.component.html',
  styleUrls: ['./liste-disciplines.component.scss']
})
export class ListeDisciplinesComponent implements OnInit {

  ListeEntraineurs: Array<any>;
  Groupes: Array<any>;

  Disciplines: Array<any>;
  nom: String;
  Entraineurs: Array<any>;
  liste: Array<any>
  entraineur: any
  error: boolean
  errorMessage: String;
  discipline: any
  index: any

  constructor(private router: Router) { 
    this.getDisciplines()
  }


  async getDisciplines(){
    this.Disciplines = []
    var q= new Parse.Query("Disciplines");

    q.include("entraineurs")

    const disciplines = await q.find();

    for (let i = 0; i < disciplines.length; i++) {
      var object = disciplines[i];
      this.Disciplines.push({
        discipline: object,
        id: object.id,
        nom: object.get('nom'),
        entraineurs: object.get('entraineurs')           
      });
    } 
  }

  afficherEntraineurs(j){
    this.ListeEntraineurs = []
    for (let i = 0; i < this.Disciplines[j].entraineurs.length; i++) {
      var object = this.Disciplines[j].entraineurs[i];

      this.ListeEntraineurs.push({
        id: object.id,
        entraienur: object,
        nom: object.get("nom")        
      });
    } 
  }

  async afficherGroupes(j){
    this.Groupes = []
    var q= new Parse.Query("Groupes");

    q.equalTo("discipline", this.Disciplines[j].discipline)

    q.include("adherents")

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

  goToAddPage(){
    this.router.navigate(['home/ajouter_disciplines']);
  }

  modifier_disc(i){

    if(this.nom==null || this.nom==""){
      this.error = true
      this.errorMessage = "Le nom est obligatoire !"
      //alert("Le nom est obligatoire !");
    }else if(this.ListeEntraineurs==null || this.ListeEntraineurs==[]){
      this.error = true
      this.errorMessage = "Les entraineurs sont obligatoires !"
      //alert("L'entraineur est obligatoire !");
    }else{
      this.error = false
      this.discipline.set("nom", this.nom)
      this.discipline.set("entraineurs", this.liste)
      this.discipline.save().then((discip) => {
        this.nom = ""
        this.entraineur = ""
        this.ListeEntraineurs = []
        this.Disciplines.splice(this.index ,1);
        this.Disciplines.push({
          discipline: discip,
          id: discip.id,
          nom: discip.get('nom'),
          entraineurs: discip.get('entraineurs')           
        });

      }, (error) => {
        alert('Failed to create new object, with error code: ' + error.message);
      });
    }
  }

  supprimer(id, i){
    var q= new Parse.Query("Disciplines");
    q.get(id).then((obj) => {
      obj.destroy().then((myobj)=>{
        this.Disciplines.splice(i,1);
      }); 
    });
  }

  modifier(i){
    this.index = i
    this.nom = this.Disciplines[i].nom
    this.getEntraineurs()
    this.discipline = this.Disciplines[i].discipline
    this.ListeEntraineurs = []
    this.liste = []
  }

  entraineurChanged(){
    this.ListeEntraineurs.push(this.Entraineurs[this.entraineur])
    this.liste.push(this.Entraineurs[this.entraineur].entraineur)
  }

  async getEntraineurs(){
    this.Entraineurs = []
    var q= new Parse.Query("Entraineurs");

    var entraineurs = await q.find();

    for (let i = 0; i < entraineurs.length; i++) {
      var object = entraineurs[i];
      this.Entraineurs.push({
        entraineur: object,
        id: object.id,
        nom: object.get('nom'),
        cin: object.get('cin') ,
        telephone: object.get('telephone')           
      });
    } 
  }

  ngOnInit() {
  }

}
