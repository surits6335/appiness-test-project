import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public userName: string;
  public name: string;
  public email: string;
  public password: string;
  public mobileNumber: number;
  public address: string;

  public signupForm: FormGroup;

  constructor(private authService: UserAuthService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userName': new FormControl(null,Validators.required),
      'name': new FormControl(null,Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passwordGroup': new FormGroup({
        'password': new FormControl(null,[Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]*$')]),
        'confirmPassword': new FormControl(null,[Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]*$')]),
      }, this.missMatch),
      'mobileNumber': new FormControl(null,Validators.required),
      'address': new FormControl(null,[Validators.required, Validators.maxLength(30)])
    })
  }

  missMatch(group: FormGroup): {[s: string]: boolean} {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? { passwordMisMatch: false } : { passwordMisMatch: true };
  }

  onSignup() {
    this.userName = this.signupForm.value.userName;
    this.name = this.signupForm.value.name;
    this.email = this.signupForm.value.email;
    this.password = this.signupForm.value.passwordGroup.password;
    this.mobileNumber = this.signupForm.value.mobileNumber;
    this.address = this.signupForm.value.address;
    this.authService.onSignUp(this.userName, this.name, this.email, this.password, this.mobileNumber, this.address);
    this.signupForm.reset();
  }

}
