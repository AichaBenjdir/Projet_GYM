import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;

@Component({
  selector: 'app-ajouter-disciplines',
  templateUrl: './ajouter-disciplines.component.html',
  styleUrls: ['./ajouter-disciplines.component.scss']
})
export class AjouterDisciplinesComponent implements OnInit {

  nom:any;
  entraineur:any
  error: boolean
  errorMessage: String;
  Entraineurs: Array<any>;
  entraineurs: Array<any>;

  ListeEntraineurs: Array<any>
  liste: Array<any>

  constructor(private router: Router) { 
    this.error = false
    this.getEntraineurs()
    this.ListeEntraineurs = []
    this.liste = []
  }


  async getEntraineurs(){
    this.Entraineurs = []
    var q= new Parse.Query("Entraineurs");

    this.entraineurs = await q.find();

    for (let i = 0; i < this.entraineurs.length; i++) {
      var object = this.entraineurs[i];
      this.Entraineurs.push({
        id: object.id,
        entraineur: object,
        nom: object.get('nom'),
        cin: object.get('cin') ,
        telephone: object.get('telephone')           
      });
    } 
  }

  entraineurChanged(){
    this.ListeEntraineurs.push(this.Entraineurs[this.entraineur])
    this.liste.push(this.Entraineurs[this.entraineur].entraineur)
  }

  ajouterDiscipline(){
    if(this.nom==null || this.nom==""){
      this.error = true
      this.errorMessage = "Le nom est obligatoire !"
      //alert("Le nom est obligatoire !");
    }else if(this.ListeEntraineurs==null || this.ListeEntraineurs==[]){
      this.error = true
      this.errorMessage = "Les entraineurs sont obligatoires !"
      //alert("L'entraineur est obligatoire !");
    }else{
      console.log(this.entraineur)
      this.error = false
      var Discipline = new Parse.Object.extend("Disciplines");
      const discipline = new Discipline();
      var q= new Parse.Query("Disciplines");
      q.equalTo("nom", this.nom);
      q.count().then((count) => {
        if(count==0){
          discipline.set("nom", this.nom);
          discipline.set("entraineurs", this.liste);
          discipline.save().then((discip) => {
            this.nom = ""
            this.entraineur = ""
            this.router.navigate(['home/liste_disciplines']);        
          }, (error) => {
            alert('Failed to create new object, with error code: ' + error.message);
          });
        }else{
          this.error = true
          this.errorMessage = "Ce discipline existe déjà!"
          //alert("Ce discipline est déjà existe!")
        }
      });
    }
  }

  ngOnInit() {
  }

}
