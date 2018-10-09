import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import {Http} from '@angular/http';
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  public userDetails: any;

  constructor(private http: Http) { }


  getFirebaseDatabase() {
    return this.http.get('https://my-test-project-5cb71.firebaseio.com/data.json')
      .pipe(map( (response: Response) => {return response.json(); }))
  }

  onSignUp(userName, name, email, password, mobileNumber, address) {

    var userIds = {
      userName: userName,
      name: name,
      email: email,
      mobileNumber: mobileNumber.toString(),
      address: address
    };
    var isDuplicateData: boolean = false;

    this.getFirebaseDatabase().subscribe(
      (response) => {
        if(response === null) {
          this.signupInFirebase(userIds, email, password);
        }
        else {
          var userIdList = Object.values(response);
          userIdList.forEach((user) => {
            if(Object.values(user).includes(userName)) {
              isDuplicateData = true;
              alert('Error: The user name is already in use by another account.');
              return false;
            }
            else if(Object.values(user).includes(mobileNumber.toString())) {
              isDuplicateData = true;
              alert('Error: The mobile number is already in use by another account.');
              return false;
            }
          });
          if(isDuplicateData === false) {
            this.signupInFirebase(userIds, email, password);
          }
        }
      },
      (error) => {
        this.retrieveUserData(false);
        alert('Firebase database error' + error);
        console.log('Firebase database error' + error);
      },
      () => {}
    );
  }

  signupInFirebase(userIds, email, password) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((value) => {
        this.http.post('https://my-test-project-5cb71.firebaseio.com/data.json', userIds, ).subscribe(
          (response) => {},
          (error) => {
            alert('Firebase database error' + error);
            console.log('Firebase database error' + error);
          },
          () => {}
        );
        console.log(value);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }

  onLogin(userId, password) {

    var isUserValid: boolean = false;

    this.getFirebaseDatabase().subscribe(
        (response) => {
          var userIdList = Object.values(response);
          userIdList.forEach((user, index) => {
            if(Object.values(user).includes(userId)) {
              firebase.auth().signInWithEmailAndPassword(user['email'], password)
                .then((response) => {
                  this.retrieveUserData(user);
                })
                .catch((error) => {
                  this.retrieveUserData(false);
                  alert(error);
                  console.log(error);
                });
              isUserValid = true;
            }
          });
          if(isUserValid === false) {
            this.retrieveUserData(false);
            alert('Invalid user');
            console.log('Invalid user');
          }
        },
        (error) => {
            this.retrieveUserData(false);
            alert('Firebase database error' + error);
            console.log('Firebase database error' + error);
          },
        () => {}
      );
  }

  retrieveUserData(userDetails) {
    this.userDetails = userDetails;
  }
}
