import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;

@Component({
  selector: 'app-ajouter-entraineurs',
  templateUrl: './ajouter-entraineurs.component.html',
  styleUrls: ['./ajouter-entraineurs.component.scss']
})
export class AjouterEntraineursComponent implements OnInit {

  nom:any;
  cin: any;
  telephone:any
  error: boolean
  errorMessage: String;

  constructor(private router: Router) { 
    this.error = false
  }

  ajouterEntraineur(){
    if(this.nom==null || this.nom==""){
      this.error = true
      this.errorMessage = "Le nom est obligatoire !"
      //alert("Le nom est obligatoire !");
    }else if(this.cin==null || this.cin.toString().length != 8){
      this.error = true
      this.errorMessage = "Le numéro de CIN est obligatoire et doit être composé de 8 chiffres !"
      //alert("L'entraineur est obligatoire !");
    }else if(this.telephone==null || this.telephone.toString().length != 8){
      this.error = true
      this.errorMessage = "Le numéro de téléphone est obligatoire et doit être composé de 8 chiffres !"
      //alert("L'entraineur est obligatoire !");
    }else{
      this.error = false
      var Entraineur = new Parse.Object.extend("Entraineurs");
      const entraineur = new Entraineur();
      var q= new Parse.Query("Entraineurs");
      q.equalTo("cin", this.cin);
      q.count().then((count) => {
        if(count==0){
          entraineur.set("nom", this.nom);
          entraineur.set("cin", this.cin);
          entraineur.set("telephone", this.telephone);
          entraineur.save().then((ent) => {
            this.nom = ""
            this.telephone = ""
            this.router.navigate(['home/liste_entraineurs']);        
          }, (error) => {
            alert('Failed to create new object, with error code: ' + error.message);
          });
        }else{
          this.error = true
          this.errorMessage = "Cet entraineur existe déjà!"
          //alert("Ce discipline est déjà existe!")
        }
      });
    }
  }

  ngOnInit() {
  }

}
