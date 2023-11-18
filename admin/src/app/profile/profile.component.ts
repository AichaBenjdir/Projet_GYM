import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FilePickerDirective, ReadFile, ReadMode } from 'ngx-file-helpers';
declare var Parse: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  nom: any
  prenom: any
  tel: any
  email: any
  currentUser: any
  form: any
  imagePath: any
  imageUrl: any

  constructor() {
    this.currentUser= Parse.User.current();
    this.nom = this.currentUser.get('name')
    this.prenom = this.currentUser.get('surname')
    this.tel = this.currentUser.get('phone')
    this.email = this.currentUser.get('email')
    if(this.currentUser.get('photo')!=null){
      this.imageUrl = this.currentUser.get('photo').url()
    }else{
      this.imageUrl = 'assets/user.png'
    }
    
  }

  updateProfile(){
    if(this.nom!=""){
      this.currentUser.set('name', this.nom)
    }
    if(this.prenom!=""){
      this.currentUser.set('surname', this.prenom)
    }
    if(this.tel!=""){
      this.currentUser.set('phone', this.tel.toString())
    }

    if(this.email!=""){
      this.currentUser.set('email', this.email)
      this.currentUser.set('username', this.email)
    }

    if(this.imageUrl!= "assets/user.png"){
      var file = new Parse.File("photo.png", { base64: this.imageUrl });
      file.save().then(() => {
        this.currentUser.set('photo', file)
        this.currentUser.save().then((user) => {
          this.currentUser= Parse.User.current();
          this.nom = this.currentUser.get('name')
          this.prenom = this.currentUser.get('surname')
          this.tel = this.currentUser.get('phone')
          this.email = this.currentUser.get('email')  
          this.imageUrl = this.currentUser.get('photo').url()
          alert('Vos informations sont bien mises à jour!');    
        }, (error) => {
          alert('Failed to create new object, with error code: ' + error.message);
        });
      }, (err) => {
        alert(err.message)
      });
    }else{
      this.currentUser.save().then((user) => {
        this.currentUser= Parse.User.current();
        this.nom = this.currentUser.get('name')
        this.prenom = this.currentUser.get('surname')
        this.tel = this.currentUser.get('phone')
        this.email = this.currentUser.get('email')  
        alert('Vos informations sont bien mises à jour!');    
      }, (error) => {
        alert('Failed to create new object, with error code: ' + error.message);
      });
    }
    

    
  }

  updatePhoto(file: ReadFile){ 
    console.log(file)
    this.imageUrl = file.content
  }


  ngOnInit() {
  }

}
