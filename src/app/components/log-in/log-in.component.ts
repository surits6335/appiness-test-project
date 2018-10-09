import {Component, OnInit, ViewChild} from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public email: string;
  public password: string;

  @ViewChild('loginReference') loginForm: NgForm;

  constructor(private authService: UserAuthService) { }

  ngOnInit() {
  }

  onLogin() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.authService.onLogin(this.email, this.password);
    this.loginForm.reset();
  }

}
