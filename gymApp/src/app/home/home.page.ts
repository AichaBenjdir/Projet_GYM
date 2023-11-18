import { Component } from '@angular/core';
import { NavController , ToastController, LoadingController } from '@ionic/angular';
import Parse from 'parse';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string;
  password: string;
  public constructor(public navCtrl: NavController, public toastCtrl: ToastController, public loadingCtrl: LoadingController){
  }

  async toastFun(msg: string){
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async loadingFun(msg: string){
    
  }

  async signIn() {
    const load = await this.loadingCtrl.create({
      message: "Loading...."
    });
    load.present();
    Parse.User.logIn(this.username, this.password).then((resp) => {
      console.log('Logged in successfully', resp);

      // If you app has Tabs, set root to TabsPage
      load.dismiss();
      this.username = '';
      this.password = '';
      this.navCtrl.navigateForward('profile');
    }, err => {
      load.dismiss();
      console.log('Error logging in', err);
      this.toastFun(err.message)
    });
  }

  signUp(){
    this.navCtrl.navigateForward('signup');
  }

}
