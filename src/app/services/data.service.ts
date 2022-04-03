import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
//import * as data from '../../assets/Untitled-1.json';

/*
const subject = webSocket("ws://localhost:8081"); // That is the web socket address
var sensorData:string;

subject.subscribe(
  msg => sensorData = JSON.parse( (String) (msg)),
  err => console.log(err),
  () => console.log('complete')
);
*/

@Injectable({
  providedIn: 'root',
})

export class DataService {
  data: string[]; // array of random number strings, one for each valve

  constructor() {
    //this.data = Array<string>(20).fill(''); // set length based on number of valves
    //setInterval(() => this.parseJSON(sensorData), 1000);
    //setInterval(() => this.parseJSON(data), 1000);

    this.data = Array<string>(4).fill(''); // set length based on number of valves
    setInterval(() => this.generateRandomData(), 1000);
  }
  
  generateRandomData(): void {
    for (let index = 0; index < this.data.length; index++) {
      this.data[index] = (Math.random() * 100).toFixed(3);
    }
  }

  public parseJSON(jsonstring): void {
    /*
    for (let index = 0; index < this.data.length; index++) {
      this.data[index] = ;
    }
    */
    /*
    // Thermocouples
    this.data[0] = (jsonstring.tc1_e == null) ? jsonstring.tc1_e : 0;
    this.data[1] = (jsonstring.tc2_e == null) ? jsonstring.tc2_e : 0;
    this.data[2] = (jsonstring.tc1_f == null) ? jsonstring.tc1_f : 0;
    this.data[3] = (jsonstring.tc2_f == null) ? jsonstring.tc2_f : 0;
    this.data[4] = (jsonstring.tc1_o == null) ? jsonstring.tc1_o : 0;
    this.data[5] = (jsonstring.tc5_o == null) ? jsonstring.tc5_o : 0;
    this.data[6] = (jsonstring.therm7 == null) ? jsonstring.therm7 : 0; // Potentially Unused

    // Flow Meters
    this.data[7] = (jsonstring.fm_f == null) ? jsonstring.fm_f : 0;
    this.data[8] = (jsonstring.fm_o == null) ? jsonstring.fm_o : 0;

    // Load Cells
    this.data[9] = (jsonstring.load1 == null) ? jsonstring.load1 : 0;
    this.data[10] = (jsonstring.load2 == null) ? jsonstring.load2 : 0;

    // Pressure Transducers
    this.data[11] = (jsonstring.pt1_f == null) ? jsonstring.pt1_f : 0;
    this.data[12] = (jsonstring.pt2_f == null) ? jsonstring.pt2_f : 0;
    this.data[13] = (jsonstring.pt1_e == null) ? jsonstring.pt1_e : 0;
    this.data[14] = (jsonstring.pt2_e == null) ? jsonstring.pt2_e : 0;
    this.data[15] = (jsonstring.pt1_o == null) ? jsonstring.pt1_o : 0;
    this.data[16] = (jsonstring.pt2_o == null) ? jsonstring.pt2_o : 0;
    this.data[17] = (jsonstring.pt4_o == null) ? jsonstring.pt4_o : 0;
    this.data[18] = (jsonstring.pt1_p == null) ? jsonstring.pt1_p : 0;
    this.data[19] = (jsonstring.pt2_p == null) ? jsonstring.pt2_p : 0;
    */
  }

}





//Send json data in arrays MATLAB Stuff DO NOT WORRY ABOUT

//Create random test json file; put in assets

/* Not sure where to put this but it's in the data service class

So, basically we just need to concatenate each JSON file for each unit time

Each time we receive data: dataFile = dataFile.concat(newDataFile); //newDataFile is the most recent piece of data

To export the data (could be added to a button on the control panel if we want or it could be automatic)
dataFile.writeFile("TestFireData.txt", jsondata, function(err) { 
  if (err){ 
    console.log(err);
  }
});

*/