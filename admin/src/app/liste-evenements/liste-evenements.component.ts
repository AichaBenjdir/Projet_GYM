import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;

@Component({
  selector: 'app-liste-evenements',
  templateUrl: './liste-evenements.component.html',
  styleUrls: ['./liste-evenements.component.scss']
})
export class ListeEvenementsComponent implements OnInit {

  Evenements: Array<any>;
  nom: String;
  date:any
  heure:any
  lieu:any
  description:any
  error: boolean
  errorMessage: String;
  evenement: any
  index: any

  constructor(private router: Router) { 
    this.getEvenements()
  }

  async getEvenements(){
    this.Evenements = []
    var q= new Parse.Query("Evenements");

    const evenements = await q.find();

    for (let i = 0; i < evenements.length; i++) {
      var object = evenements[i];
      this.Evenements.push({
        evenement: object,
        id: object.id,
        nom: object.get('nom'),
        date: object.get('date'),
        heure: object.get('heure'),  
        lieu: object.get('lieu'),  
        description: object.get('description')     
      });
    } 
  }

  goToAddPage(){
    this.router.navigate(['home/ajouter_evenements']);
  }

  supprimer(id, i){
    var q= new Parse.Query("Evenements");
    q.get(id).then((obj) => {
      obj.destroy().then((myobj)=>{
        this.Evenements.splice(i,1);
      }); 
    });
  }

  modifier(i){
    this.index = i
    this.nom = this.Evenements[i].nom
    this.date = this.Evenements[i].date
    this.heure = this.Evenements[i].heure
    this.lieu = this.Evenements[i].lieu
    this.description = this.Evenements[i].description
    this.evenement = this.Evenements[i].evenement
  }

  modifier_evenement(i){

    if(this.nom==null || this.nom==""){
      this.error = true
      this.errorMessage = "Le nom est obligatoire !"
      //alert("Le nom est obligatoire !");
    }else if(this.date==null || this.date==""){
      this.error = true
      this.errorMessage = "Le date est obligatoire !"
      //alert("L'entraineur est obligatoire !");
    }else if(this.heure==null || this.heure==""){
      this.error = true
      this.errorMessage = "L'heure est obligatoire !"
      //alert("L'entraineur est obligatoire !");
    }else if(this.lieu==null || this.lieu==""){
      this.error = true
      this.errorMessage = "Le lieu est obligatoire !"
      //alert("L'entraineur est obligatoire !");
    }else if(this.description==null || this.description==""){
      this.error = true
      this.errorMessage = "La description est obligatoire !"
      //alert("L'entraineur est obligatoire !");
    }else{
      this.error = false
      var q= new Parse.Query("Evenements");
      q.equalTo("nom", this.nom);
      q.equalTo("date", this.date);
      q.equalTo("heure", this.heure);
      q.equalTo("lieu", this.lieu);
      q.equalTo("description", this.description);
      q.count().then((count) => {
        if(count==0){
          this.evenement.set("nom", this.nom);
          this.evenement.set("date", this.date);
          this.evenement.set("heure", this.heure);
          this.evenement.set("lieu", this.lieu);
          this.evenement.set("description", this.description);
          this.evenement.save().then((even) => {
            this.nom = ""
            this.date = ""
            this.heure = ""
            this.lieu = ""
            this.description = ""
            this.Evenements.splice(this.index ,1);
            this.Evenements.push({
              evenement: even,
              id: even.id,
              nom: even.get('nom'),
              date: even.get('date'),
              heure: even.get('heure'),  
              lieu: even.get('lieu'),  
              description: even.get('description')           
            });
          }, (error) => {
            alert('Failed to create new object, with error code: ' + error.message);
          });
        }else{
          this.error = true
          this.errorMessage = "Cet évènement existe déjà!"
          //alert("Ce discipline est déjà existe!")
        }
      });
    }
  }

  ngOnInit() {
  }

}
