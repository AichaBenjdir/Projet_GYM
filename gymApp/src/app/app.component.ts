import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import Parse from 'parse';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: string;
  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
    Parse.initialize(
      'REJV0nSyJs6qtDAEkAFvQAH7tyi0Lzk7Bio8B5j6', // This is your Application ID
      'ze0X3Qyr6mrRavRhWyX2XivO6Cds4p6suBy95NlA' // This is your Javascript key
    );

    let install = new Parse.Installation();
    install.set("deviceType", "android")
    //install.save()


    Parse.User.currentAsync().then(user => {
      console.log('Logged user', user);
  
      this.rootPage = user ? 'profile' : 'home';
      this.navCtrl.navigateForward(this.rootPage);
    }, err => {
      console.log('Error getting logged user');
      this.rootPage = 'home';
      this.navCtrl.navigateForward(this.rootPage);
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
