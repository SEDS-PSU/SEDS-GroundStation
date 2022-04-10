import { Injectable } from '@angular/core';
import { Observable,  Subject} from 'rxjs';
import { CommunicationService } from "./communication.service";
import { map } from 'rxjs/operators'; 

const CHAT_URL = "ws://192.168.1.6:8765";
//const CHAT_URL = "192.168.1.6"
//const CHAT_URL = "ws://127.0.0.1:8765";
export interface Message{
  Valve: string;
  PT1_F: string;
  PT2_F: string;
  PT1_O: string;
  PT2_O: string;
  PT4_O: string;
  PT1_P: string;
  PT2_P: string;
  PT1_E: string;
  PT2_E: string;
  TC1_F: string;
  TC2_F: string;
  TC1_O: string;
  TC5_O: string;
  TC1_E: string;
  TC2_E: string;
  FM_F: string;
  FM_O: string;
  Load1: string;
  Load2: string;
}

@Injectable()
export class CommTestService {
  public messages: Subject<Message>;
  constructor(wsService: CommunicationService) { 
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL)
      .pipe(
        map(
          (response: MessageEvent): Message => {
            let data = JSON.parse(response.data);
            return {
              Valve: data.Valve,
              PT1_F: data.PT1_F,
              PT2_F: data.PT2_F,
              PT1_O: data.PT1_O,
              PT2_O: data.PT2_O,
              PT4_O: data.PT4_O,
              PT1_P: data.PT1_P,
              PT2_P: data.PT2_P,
              PT1_E: data.PT1_E,
              PT2_E: data.PT2_E,
              TC1_F: data.TC1_F,
              TC2_F: data.TC2_F,
              TC1_O: data.TC1_O,
              TC5_O: data.TC5_O,
              TC1_E: data.TC1_E,
              TC2_E: data.TC2_E,
              FM_F: data.FM_F,
              FM_O: data.FM_O,
              Load1: data.Load1,
              Load2: data.Load2
            };
          }
        )
      );
  }
}
