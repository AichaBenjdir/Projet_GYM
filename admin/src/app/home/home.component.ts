import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Location} from '@angular/common';
declare const Parse: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user_name: String
  imageUrl: any = ""

  constructor(private router: Router, private location:Location) { 
    this.user_name = Parse.User.current().get("surname")+ ' '+ Parse.User.current().get("name")
    this.location.replaceState('/home/acceuil');
    if(Parse.User.current().get('photo')!=null){
      this.imageUrl = Parse.User.current().get('photo').url()
    }else{
      this.imageUrl = 'assets/user.png'
    }
  }


  ngOnInit() {
  }

  logout(): void{

    Parse.User.logOut().then(() => {
      this.location.replaceState('/');
      this.router.navigate(['login']);
    });
  }

}
