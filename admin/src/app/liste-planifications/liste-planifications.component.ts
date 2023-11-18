import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare var Parse: any;

@Component({
  selector: 'app-liste-planifications',
  templateUrl: './liste-planifications.component.html',
  styleUrls: ['./liste-planifications.component.scss']
})
export class ListePlanificationsComponent implements OnInit {

  Planifications: Array<any>
  ListeJours: Array<any>
  index: any
  planification: any


  groupe: any
  Jours: Array<any>
  salle:any
  heureDebut:any
  heureFin:any
  jours: any
  error: boolean
  errorMessage: String;
  Groupes: Array<any>;

  constructor(private router: Router) { 
    this.getPlanifications()
  }

  goToAddPage(){
    this.router.navigate(['home/ajouter_planifications']);
  }

  async getPlanifications(){
    this.Planifications = []
    var q= new Parse.Query("Planifications");

    q.include("groupe")

    const planifications = await q.find();

    for (let i = 0; i < planifications.length; i++) {
      var object = planifications[i];

      this.Planifications.push({
        id: object.id,
        planification: object,
        groupe: object.get('groupe'),
        nom_groupe: object.get('groupe').get('nom'),
        salle: object.get('salle'),
        heure_debut: object.get('heure_debut'),
        heure_fin: object.get('heure_fin'),
        jours: object.get('jours')        
      });
    } 
  }

  afficherJours(j){
    console.log(this.Planifications[j].jours.length)
    this.ListeJours = []
    for (let i = 0; i < this.Planifications[j].jours.length; i++) {
      var jour = this.Planifications[j].jours[i];
      this.ListeJours.push(jour);
    } 
  }

  supprimer(id, i){
    var q= new Parse.Query("Planifications");
    q.get(id).then((obj) => {
      obj.destroy().then((myobj)=>{
        this.Planifications.splice(i,1);
      }); 
    });
  }

  modifier(i){
    this.index = i
    this.Jours = []
    this.salle = this.Planifications[i].salle
    this.heureDebut = this.Planifications[i].heure_debut
    this.heureFin = this.Planifications[i].heure_fin
    this.getGroupes()
    this.planification = this.Planifications[i].planification
  }

  modifier_planification(i){
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

      this.planification.set("groupe", this.Groupes[this.groupe].groupe);
      this.planification.set("salle", this.salle);
      this.planification.set("heure_debut", this.heureDebut);
      this.planification.set("heure_fin", this.heureFin);
      this.planification.set("jours", this.Jours);
      this.planification.save().then((plan) => {
            this.groupe = ""
            this.salle = ""
            this.heureDebut = ""
            this.heureFin = ""
            this.Jours = []
            this.Planifications.splice(this.index, 1)     
            this.Planifications.push({
              id: plan.id,
              planification: plan,
              groupe: plan.get('groupe'),
              nom_groupe: plan.get('groupe').get('nom'),
              salle: plan.get('salle'),
              heure_debut: plan.get('heure_debut'),
              heure_fin: plan.get('heure_fin'),
              jours: plan.get('jours')        
            }); 
          }, (error) => {
            alert('Failed to create new object, with error code: ' + error.message);
          });
    }
  }

  joursChanged(){
    this.Jours.push(this.jours)
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


  ngOnInit() {
  }

}
