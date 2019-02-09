import { Component, OnInit } from '@angular/core';

declare const cordova: any;
declare const Camera: any;

@Component({
  selector: 'cvs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public scanResult: string;
  constructor() { }

  ngOnInit() { }

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
