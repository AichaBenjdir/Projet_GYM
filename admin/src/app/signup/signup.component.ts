import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare const Parse: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  nom: string
  prenom: String
  email: String
  password: string
  confirmPassword: String
  error: boolean

  constructor(private router: Router) { 
    this.error = false
  }

  signup(): void{

    if(this.password == this.confirmPassword){
      var user = new Parse.User();
      user.set("username", this.email);
      user.set("password", this.password);
      user.set("email", this.email);
      user.set("name", this.nom);
      user.set("surname", this.prenom);
      user.set("isAdmin", true);

      user.signUp().then((resp) => {
        console.log('Logged in successfully', resp);
        // Clears up the form
        this.nom = '';
        this.prenom = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
        this.router.navigate(['home']);
      }, err => {
        this.error = true
        console.log('Error signing in', err);
      });
    } else{
      this.error = true
      this.nom = '';
      this.prenom = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    }

  }

  ngOnInit() {
  }

}
