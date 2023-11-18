import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare const Parse: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string
  password: string
  error: boolean
  rootPage: string
  constructor(private router: Router) { 
    this.error = false
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

  ngOnInit() {
  }

  login(): void{

    Parse.User.logIn(this.username, this.password).then((resp) => {
      console.log('Logged in successfully', resp);
      if(resp.get("isAdmin")){
        this.error = false
        this.username = '';
        this.password = '';
        this.router.navigate(['home']);
      } else{
        this.error = true
        Parse.User.logOut();
      }
      // If you app has Tabs, set root to TabsPage
    }, err => {
      this.error = true
      console.log('Error logging in', err);
    });

    /* if(this.username == "admin" && this.password == "admin"){
      
      this.router.navigate(['home']);
    }else{
      this.error = true
      this.username = ""
      this.password = ""
    } */
  }

}
