import { Component } from '@angular/core';
import { CommunicationService } from "./services/communication.service";
import { CommTestService } from './services/comm-test.service';
import { DataService } from './services/data.service';
import { RandomDataService } from './services/random-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CommunicationService, CommTestService]
})
export class AppComponent {
  constructor(private randomNum: RandomDataService, private commTest: CommTestService){
    commTest.messages.subscribe(msg => {
      console.log("Response from websocket: ", msg);
    });

    this.sendMsg();
  }

  public message = {
    Valve: "TC1-E",
    Data: "DATA",
    Data1: "Data",
    Data2: "data",
    Data3: "Data",
    Data4: "Data",
    Data5: "Data",
    Data6: "Data",
    Data7: "Data",
    Data8: "Data",
    Data9: "Data",
    Data10: "Data",
    Data11: "data",
    Data12: "Data",
    Data13: "Data",
    Data14: "Data",
    Data15: "Data",
    Data16: "Data",
    Data17: "Data",
    Data18: "Data",
    Data19: "Data"
  };

  sendMsg() {
    console.log("New message from client to websocket: ", this.message);
    this.commTest.messages.next(this.message);
    this.message.Data = this.randomNum.data[0];
    console.log("after sending message");
  }
  title = 'SEDS-GroundStation';
}