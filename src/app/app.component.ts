import {Component, OnInit} from '@angular/core';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD_9WgEElhSM5k8PH-wWA9RhcVhsBcaddM',
      authDomain: 'my-test-project-5cb71.firebaseapp.com'
    });
  }
}
