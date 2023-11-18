import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;

@Component({
  selector: 'app-liste-groupes',
  templateUrl: './liste-groupes.component.html',
  styleUrls: ['./liste-groupes.component.scss']
})
export class ListeGroupesComponent implements OnInit {

  Groupes: Array<any>;
  nom: String;
  Entraineurs: Array<any>;
  Adherents: Array<any>;
  entraineur: any
  error: boolean
  errorMessage: String;
  discipline: any
  index: any
  groupe: any

  adherent:any
  listeAdherents:any
  Disciplines: Array<any>;
  disciplines: Array<any>;
  adherents: Array<any>;
  ListeAdherents: Array<any>;
  liste: Array<any>;

  constructor(private router: Router) { 
    this.getGroupes()
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
        entraineur: object.get('entraineur'),
        adherents: object.get('adherents'),
        nom_discipline: object.get('discipline').get('nom'),
        nom_entraineur: object.get('entraineur').get('nom')           
      });
    } 
  }

  goToAddPage(){
    this.router.navigate(['home/ajouter_groupe']);
  }

  afficherAdherents(j){
    this.Adherents = []
    for (let i = 0; i < this.Groupes[j].adherents.length; i++) {
      var object = this.Groupes[j].adherents[i];

      this.Adherents.push({
        id: object.id,
        adherent: object,
        nom: object.get("name")        
      });
    } 
  }

  supprimer(id, i){
    var q= new Parse.Query("Groupes");
    q.get(id).then((obj) => {
      obj.destroy().then((myobj)=>{
        this.Groupes.splice(i,1);
      }); 
    });
  }

  modifier(i){
    this.index = i
    this.nom = this.Groupes[i].nom
    this.ListeAdherents =[]
    this.liste = []
    this.getDisciplines()
    this.getAdherents()
    this.groupe = this.Groupes[i].groupe
  }

  modifierGroupe(i){
    if(this.nom==null || this.nom==""){
      this.error = true
      this.errorMessage = "Le nom est obligatoire !"
      //alert("Le nom est obligatoire !");
    }else if(this.discipline==null || this.discipline==""){
      this.error = true
      this.errorMessage = "Le discipline est obligatoire !"
      //alert("Le nom est obligatoire !");
    }else if(this.ListeAdherents==null || this.ListeAdherents==[]){
      this.error = true
      this.errorMessage = "Les adhérents sont obligatoires !"
      //alert("L'entraineur est obligatoire !");
    }else{
      this.error = false
      var q= new Parse.Query("Groupes");

      this.groupe.set("nom", this.nom);
      this.groupe.set("discipline", this.Disciplines[this.discipline].discipline);
      this.groupe.set("entraineur", this.Disciplines[this.discipline].entraineur);
      this.groupe.set("adherents", this.liste);
      this.groupe.save().then((grp) => {
            this.nom = ""
            this.discipline = ""
            this.adherent = ""
            this.listeAdherents = ""
            this.Groupes.splice(this.index, 1)
            this.Groupes.push({
              id: grp.id,
              groupe: grp,
              nom: grp.get('nom'),
              discipline: grp.get('discipline'),
              entraineur: grp.get('entraineur'),
              adherents: grp.get('adherents'),
              nom_discipline: grp.get('discipline').get('nom'),
              nom_entraineur: grp.get('entraineur').get('nom')           
            });       
          }, (error) => {
            alert('Failed to create new object, with error code: ' + error.message);
          });

      q.equalTo("nom", this.nom);
      q.equalTo("discipline", this.Disciplines[this.discipline].discipline);
      q.equalTo("entraineur", this.Disciplines[this.discipline].entraineur);
      q.equalTo("adherents", this.liste);
      q.count().then((count) => {
        if(count==0){
          
        }else{
          this.error = true
          this.errorMessage = "Ce groupe existe déjà!"
          //alert("Ce discipline est déjà existe!")
        }
      });
    }
  }


  async getDisciplines(){
    this.Disciplines = []
    var q= new Parse.Query("Disciplines");

    q.include("entraineur")

    this.disciplines = await q.find();

    for (let i = 0; i < this.disciplines.length; i++) {
      var object = this.disciplines[i];
      this.Disciplines.push({
        id: object.id,
        discipline: object,
        nom: object.get('nom'),
        entraineur: object.get('entraineur'),
        nom_entraineur: object.get('entraineur').get('nom')  
      });
    } 
  }

  async getAdherents(){
    this.Adherents = []
    var q= new Parse.Query("Adherents");
    var q1= new Parse.Query("Abonnements");


    this.adherents = await q.find();

    for (let i = 0; i < this.adherents.length; i++) {
      var object = this.adherents[i];

      if(this.discipline!=null && this.discipline != ""){
        q1.equalTo("discipline", this.Disciplines[this.discipline].discipline)
      }

      q1.equalTo("adherent", object)

      if(await q1.find()!= null){
        this.Adherents.push({
          id: object.id,
          nom: object.get('name'),
          adherent: object        
        });
        
      }
    
    } 
  }

  disciplineChanged(){
    console.log(this.discipline)
    this.getAdherents()
  }

  adherentChanged(){
    console.log(this.adherent)
    console.log(this.Adherents[this.adherent])
    this.ListeAdherents.push(this.Adherents[this.adherent])
    this.liste.push(this.Adherents[this.adherent].adherent)
  }

  ngOnInit() {
  }

}
