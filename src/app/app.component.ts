import { Component } from '@angular/core';
import { CommunicationService } from "./services/communication.service";
import { CommTestService } from './services/comm-test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CommunicationService, CommTestService]
})
export class AppComponent {
  constructor(private commTest: CommTestService){
    commTest.messages.subscribe(msg => {
      console.log("Response from websocket: ", msg);
    });
  }

  private message = {
    author: "SEDS",
    message: "Please please work"
  };

  sendMsg() {
    console.log("New message from client to websocket: ", this.message);
    this.commTest.messages.next(this.message);
    this.message.message = "";
  }
  title = 'SEDS-GroundStation';
}