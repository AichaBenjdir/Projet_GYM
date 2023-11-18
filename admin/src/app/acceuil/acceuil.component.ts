import { Component, OnInit } from '@angular/core';
declare const Parse: any;

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})
export class AcceuilComponent implements OnInit {

  disciplines: any
  entraineurs: any
  adherents: any
  groupes: any

  constructor() {
    this.getDisciplines()
    this.getEntraineurs()
    this.getAdherents()
    this.getGroupes()
   }

  async getDisciplines(){
    var q= new Parse.Query("Disciplines");
    this.disciplines = await q.count();
  }

  async getEntraineurs(){
    var q= new Parse.Query("Entraineurs");
    this.entraineurs = await q.count();
  }

  async getAdherents(){
    var q= new Parse.Query("Adherents");
    this.adherents = await q.count();
  }

  async getGroupes(){
    var q= new Parse.Query("Groupes");
    this.groupes = await q.count();
  }

  ngOnInit() {
  }

}
