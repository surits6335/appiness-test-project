import {Component, DoCheck} from '@angular/core';
import {UserAuthService} from '../../services/user-auth.service';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements DoCheck {
  public userDetails: any;

  constructor(private authService: UserAuthService) { }

  ngDoCheck() {
    this.userDetails = this.authService.userDetails;
  }

}
