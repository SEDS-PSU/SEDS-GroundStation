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

  public SensorData = {
    PT1_F: 0,
    PT2_F: 0,
    PT1_O: 0,
    PT2_O: 0,
    PT3_O: 0,
    PT4_O: 0,
    PT1_P: 0,
    PT2_P: 0,
    PT1_E: 0,
    PT2_E: 0,
    TC1_F: 0,
    TC2_F: 0,
    TC1_O: 0,
    TC5_O: 0,
    TC1_E: 0,
    TC2_E: 0,
    FM_F: 0,
    FM_O: 0,
    ThrustLoadCell: 0,
    NitrousLoadCell: 0
  };

  sendMsg() {
    console.log("New message from client to websocket: ", this.SensorData);
    this.commTest.messages.next(this.SensorData);
    console.log("after sending message");
  }
  title = 'SEDS-GroundStation';
}