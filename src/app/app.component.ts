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
    Valve: "data",
    PT1_F: "data",
    PT2_F: "data",
    PT1_O: "data",
    PT2_O: "data",
    PT4_O: "data",
    PT1_P: "data",
    PT2_P: "data",
    PT1_E: "data",
    PT2_E: "data",
    TC1_F: "data",
    TC2_F: "data",
    TC1_O: "data",
    TC5_O: "data",
    TC1_E: "data",
    TC2_E: "data",
    FM_F: "data",
    FM_O: "data",
    Load1: "data",
    Load2: "data"
  };

  sendMsg() {
    console.log("New message from client to websocket: ", this.message);
    this.commTest.messages.next(this.message);
    this.message.PT1_F = this.randomNum.data[0];
    console.log("after sending message");
  }
  title = 'SEDS-GroundStation';
}