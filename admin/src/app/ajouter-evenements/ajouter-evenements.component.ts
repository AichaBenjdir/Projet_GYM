import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;

@Component({
  selector: 'app-ajouter-evenements',
  templateUrl: './ajouter-evenements.component.html',
  styleUrls: ['./ajouter-evenements.component.scss']
})
export class AjouterEvenementsComponent implements OnInit {

  nom:any;
  date:any
  heure:any
  lieu:any
  description:any
  error: boolean
  errorMessage: String;

  constructor(private router: Router) { 
    this.error = false
  }

  ajouterEvenement(){
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
      var Evenement = new Parse.Object.extend("Evenements");
      const evenement = new Evenement();
      var q= new Parse.Query("Evenements");
      q.equalTo("nom", this.nom);
      q.equalTo("date", this.date);
      q.equalTo("heure", this.heure);
      q.equalTo("lieu", this.lieu);
      q.equalTo("description", this.description);
      q.count().then((count) => {
        if(count==0){
          evenement.set("nom", this.nom);
          evenement.set("date", this.date);
          evenement.set("heure", this.heure);
          evenement.set("lieu", this.lieu);
          evenement.set("description", this.description);
          evenement.save().then((even) => {
            this.nom = ""
            this.date = ""
            this.heure = ""
            this.lieu = ""
            this.description = ""
            this.router.navigate(['home/liste_evenements']);        
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
