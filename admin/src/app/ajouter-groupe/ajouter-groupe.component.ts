import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;

@Component({
  selector: 'app-ajouter-groupe',
  templateUrl: './ajouter-groupe.component.html',
  styleUrls: ['./ajouter-groupe.component.scss']
})
export class AjouterGroupeComponent implements OnInit {

  nom:String;
  discipline:any
  adherent:any
  listeAdherents:any
  error: boolean
  errorMessage: String;
  Disciplines: Array<any>;
  disciplines: Array<any>;
  Adherents: Array<any>;
  adherents: Array<any>;
  ListeAdherents: Array<any>;
  liste: Array<any>;

  constructor(private router: Router) { 
    this.error = false
    this.getDisciplines()
    this.getAdherents()
    this.ListeAdherents = []
    this.liste = []
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

  ajouterGroupe(){
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
      var Groupe = new Parse.Object.extend("Groupes");
      const groupe = new Groupe();
      var q= new Parse.Query("Groupes");

      groupe.set("nom", this.nom);
          groupe.set("discipline", this.Disciplines[this.discipline].discipline);
          groupe.set("entraineur", this.Disciplines[this.discipline].entraineur);
          groupe.set("adherents", this.liste);
          groupe.save().then((discip) => {
            this.nom = ""
            this.discipline = ""
            this.adherent = ""
            this.listeAdherents = ""
            this.router.navigate(['home/liste_groupes']);        
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

  ngOnInit() {
  }


}
