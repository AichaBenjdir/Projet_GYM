import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
declare const Parse: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: string
  success: boolean

  constructor() { 
    this.success = false
  }

  resetPassword(): void{

    Parse.User.requestPasswordReset(this.email)
    .then(() => {
      this.success = true
      // If you app has Tabs, set root to TabsPage
    }, err => {
      this.success = true
      console.log('Error in', err);
    });
  }

  ngOnInit() {
  }

}
