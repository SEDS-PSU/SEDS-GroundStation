import { Injectable } from '@angular/core';
import { Observable,  Subject} from 'rxjs';
import { CommunicationService } from "./communication.service";
import { map } from 'rxjs/operators'; 
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { DiagramComponent } from '../components/diagram/diagram.component';

//MAINconst CHAT_URL = "ws://192.168.1.6:8765"; // testing raspi
//const CHAT_URL = "192.168.1.6"
//const CHAT_URL = "ws://127.0.0.1:8765"; // local testing
const CHAT_URL = "ws://raspberrypi.local:8080"

export interface SensorData{
  TIMESTAMP: number | undefined;
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

export interface valveStates{
  "SetValves" : {
    FO_FP: any,//"open" | "closed",
    FC_FP: any,//"open" | "closed",
    FC_P: any,//"open" | "closed",
    FC1_F: any,//"open" | "closed",
    FO_P1: any,//"open" | "closed",
    FO2_O: any,//"open" | "closed",
    FC4_O: any,//"open" | "closed",
    FC3_O: any,//"open" | "closed",
    PV_F: any,//"ethanol" | "closed",
    PV_O: any//"nitrous" | "closed"
  }
}

@Injectable()
export class CommTestService {
  public messages: Subject<SensorData>;
  public valveMessages: Subject<valveStates | string>;
  constructor(wsService: CommunicationService) { 
    this.valveMessages = <Subject<valveStates | string>>wsService.connect(CHAT_URL)
      .pipe(
        map(
          (response: MessageEvent): valveStates => {
            let data = JSON.parse(response.data);
            return {
              "SetValves" : {
              FO_FP: "open", // 
              FC_FP: "open", //
              FC_P: "open",  //
              FC1_F: "open", //
              FO_P1: "open", //
              FO2_O: "open", //
              FC4_O: "open", //
              FC3_O: "open", //
              PV_F: "ethanol", //
              PV_O: "nitrous"  //
              }
            };
          }
        )
      );
    this.messages = <Subject<SensorData>>wsService.connect(CHAT_URL)
      .pipe(
        map(
          (response: MessageEvent): SensorData => {
            let data = JSON.parse(response.data);
            return {
                TIMESTAMP: data.TIMESTAMP,
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
                ThrustLoadCell: data.ThrustLoadCell,
                NitrousLoadCell: data.NitrousLoadCell
            };
          }
        )
      );
  }
}
