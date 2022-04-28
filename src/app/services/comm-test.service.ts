import { Injectable } from '@angular/core';
import { Observable,  Subject} from 'rxjs';
import { CommunicationService } from "./communication.service";
import { map } from 'rxjs/operators'; 

const CHAT_URL = "ws://192.168.1.6:8765";
//const CHAT_URL = "192.168.1.6"
//const CHAT_URL = "ws://127.0.0.1:8765";
export interface SensorData{
  PT1_F: number | undefined;
  PT2_F: number | undefined;
  PT1_O: number | undefined;
  PT2_O: number | undefined;
  PT3_O: number | undefined;
  PT4_O: number | undefined;
  PT1_P: number | undefined;
  PT2_P: number | undefined;
  PT1_E: number | undefined;
  PT2_E: number | undefined;
  TC1_F: number | undefined;
  TC2_F: number | undefined;
  TC1_O: number | undefined;
  TC5_O: number | undefined;
  TC1_E: number | undefined;
  TC2_E: number | undefined;
  FM_F: number | undefined;
  FM_O: number | undefined;
  ThrustLoadCell: number | undefined;
  NitrousLoadCell: number | undefined;
}

@Injectable()
export class CommTestService {
  public messages: Subject<SensorData>;
  constructor(wsService: CommunicationService) { 
    this.messages = <Subject<SensorData>>wsService.connect(CHAT_URL)
      .pipe(
        map(
          (response: MessageEvent): SensorData => {
            let data = JSON.parse(response.data);
            return {
              PT1_F: data.PT1_F,
              PT2_F: data.PT2_F,
              PT1_O: data.PT1_O,
              PT2_O: data.PT2_O,
              PT3_O: data.PT3_O,
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
              ThrustLoadCell: data.Load1,
              NitrousLoadCell: data.Load2
            };
          }
        )
      );
  }
}
