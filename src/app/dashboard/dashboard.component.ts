import * as firebase from 'firebase';
// import firestore from 'firebase/firestore';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from '../shared/services/user/user.service';


declare const cordova: any;

@Component({
  selector: 'cvs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public users: any;
  public scanResult: string;
  constructor() { }

  ngOnInit() {
    // firebase.initializeApp(environment.firebaseConfig);
    // firebase.firestore().settings({timestampsInSnapshots: true});
    // this.users = this.user.getUsers();
  }

  startScan() {
    cordova.plugins.barcodeScanner.scan((result) => {
        this.scanResult = `Result: ${result.text} <br/>
        Format: ${result.format} <br/>
        Cancelled:  ${result.cancelled}`;

        alert(`Scanning result: ${result}`);
      }, error => alert(`Scanning failed: ${error}`)
    );
  }

  addVehicle() {
    alert('WIP....');
  }
}
