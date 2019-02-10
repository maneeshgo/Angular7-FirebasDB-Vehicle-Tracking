import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private fireRef = firebase.firestore().collection('User');
  constructor() { }

  getUsers(): Observable<any> {
    return new Observable((observer) => {
      this.fireRef.onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            key: doc.id,
            Name: data.Name,
            Age: data.Age
          });
        });
        observer.next(list);
      });
    });
  }
  getUser(id: string): Observable<any> {
    return new Observable((observer) => {
      this.fireRef.doc(id).get().then((doc) => {
        const data = doc.data();
        observer.next({
          key: doc.id,
          Name: data.Name,
          Age: data.Age
        });
      });
    });
  }
  postUser(data): Observable<any> {
    return new Observable((observer) => {
      this.fireRef.add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }

  updateUser(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.fireRef.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  deleteUser(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.fireRef.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }
}
