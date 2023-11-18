import { Component } from '@angular/core';
import { Router} from '@angular/router';
declare const Parse: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  rootPage: string;
  
  constructor(private router: Router) {
    Parse.User.currentAsync().then(user => {
      console.log('Logged user', user);
      this.rootPage = user ? 'home' : 'login';
      this.router.navigate([this.rootPage]);
    }, err => {
      console.log('Error getting logged user');
      this.rootPage = 'login';
      this.router.navigate([this.rootPage]);
    })
  }
}
