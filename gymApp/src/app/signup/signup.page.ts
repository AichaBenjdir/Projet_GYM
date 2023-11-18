import { Component, OnInit } from '@angular/core';
import { NavController , ToastController, LoadingController } from '@ionic/angular';
import Parse from 'parse';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  email: string;
  password: string;
  name: string;
  num_tel: string;
  num_cin: string;
  sexe: any;
  date_naissance: any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) { }

  async toastFun(msg: string){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async signUp() {

    if(this.num_tel.toString().length !=8){
      this.toastFun("Le numéro de téléphone doit être composé de 8 chiffres!")
    }else if(this.num_cin.toString().length !=8){
      this.toastFun("Le numéro de CIN doit être composé de 8 chiffres!")
    }else{

      const load = await this.loadingCtrl.create({
        message: "Loading...."
      });
      load.present();

      var Adherents = new Parse.Object.extend("Adherents");
      const adherent = new Adherents();
      adherent.set("name", this.name)
      adherent.set("num_tel", this.num_tel)
      adherent.set("cin", this.num_cin)
      adherent.set("birth_date", this.date_naissance)
      adherent.set("sexe", this.sexe)
      adherent.save().then((adh) => {
        var user = new Parse.User();
        user.set("username", this.email);
        user.set("password", this.password);
        user.set("email", this.email);
        user.set("name", this.name);
        user.set("phone", this.num_tel);
        user.set("adherent", adh);

        user.signUp().then((resp) => {
          console.log('Logged in successfully', resp);
          load.dismiss();
          // Clears up the form
          this.name = '';
          this.email = '';
          this.password = '';
          this.num_tel = '';
          this.toastFun('Account created successfully')      
          this.navCtrl.navigateForward('profile');
        }, err => {
          load.dismiss();
          console.log('Error signing in', err);
          this.toastFun(err.message)
          adh.destroy();
        });  
      }, (error) => {
        alert('Failed to create new object, with error code: ' + error.message);
      });
    }
  }

  signIn(){
    this.navCtrl.navigateForward('home');
  }


  ngOnInit() {
  }

}
