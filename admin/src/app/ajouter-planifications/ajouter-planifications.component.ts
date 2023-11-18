import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;


@Component({
  selector: 'app-ajouter-planifications',
  templateUrl: './ajouter-planifications.component.html',
  styleUrls: ['./ajouter-planifications.component.scss']
})
export class AjouterPlanificationsComponent implements OnInit {

  groupe: any
  salle:any
  heureDebut:any
  heureFin:any
  jours: any
  error: boolean
  errorMessage: String;
  Groupes: Array<any>;
  Jours: Array<any>;


  constructor(private router: Router) {
    this.error = false
    this.getGroupes()
    this.Jours = []
  }

  async getGroupes(){
    this.Groupes = []
    var q= new Parse.Query("Groupes");

    q.include("discipline")
    q.include("entraineur")

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
        nom_entraineur: object.get('entraineur').get('nom')  
      });
    } 
  }

  joursChanged(){
    this.Jours.push(this.jours)
  }

  ajouterPlanification(){
    if(this.groupe==null || this.groupe==""){
      this.error = true
      this.errorMessage = "Le groupe est obligatoire !"
      //alert("Le nom est obligatoire !");
    }else if(this.salle==null || this.salle==""){
      this.error = true
      this.errorMessage = "La salle est obligatoire !"
      //alert("Le nom est obligatoire !");
    }else if(this.heureDebut==null || this.heureDebut==""){
      this.error = true
      this.errorMessage = "L'heure de début est obligatoire !"
      //alert("L'entraineur est obligatoire !");
    }else if(this.heureFin==null || this.heureFin==""){
      this.error = true
      this.errorMessage = "L'heure de fin est obligatoire !"
      //alert("L'entraineur est obligatoire !");
    }else if(this.Jours==null || this.Jours==[]){
      this.error = true
      this.errorMessage = "Les jours sont obligatoires !"
      //alert("L'entraineur est obligatoire !");
    }else{
      this.error = false
      var Planification = new Parse.Object.extend("Planifications");
      const planification = new Planification();
      var q= new Parse.Query("Planifications");

      planification.set("groupe", this.Groupes[this.groupe].groupe);
      planification.set("salle", this.salle);
      planification.set("heure_debut", this.heureDebut);
      planification.set("heure_fin", this.heureFin);
      planification.set("jours", this.Jours);
      planification.save().then((discip) => {
            this.groupe = ""
            this.salle = ""
            this.heureDebut = ""
            this.heureFin = ""
            this.Jours = []
            this.router.navigate(['home/liste_planifications']);        
          }, (error) => {
            alert('Failed to create new object, with error code: ' + error.message);
          });
    }
  }

  ngOnInit() {
  }

}
