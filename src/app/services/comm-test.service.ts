import { Injectable } from '@angular/core';
import { Observable,  Subject} from 'rxjs';
import { CommunicationService } from "./communication.service";
import { map } from 'rxjs/operators'; 

//const CHAT_URL = "ws://192.168.1.6:8765";
//const CHAT_URL = "192.168.1.6"
const CHAT_URL = "ws://127.0.0.1:8765";
export interface Message{
  Valve: string;
  Data: string;
  Data1: string;
  Data2: string;
  Data3: string;
  Data4: string;
  Data5: string;
  Data6: string;
  Data7: string;
  Data8: string;
  Data9: string;
  Data10: string;
  Data11: string;
  Data12: string;
  Data13: string;
  Data14: string;
  Data15: string;
  Data16: string;
  Data17: string;
  Data18: string;
  Data19: string;
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
              Data: data.Data,
              Data1: data.Data1,
              Data2: data.Data2,
              Data3: data.Data3,
              Data4: data.Data4,
              Data5: data.Data5,
              Data6: data.Data6,
              Data7: data.Data7,
              Data8: data.Data8,
              Data9: data.Data9,
              Data10: data.Data10,
              Data11: data.Data11,
              Data12: data.Data12,
              Data13: data.Data13,
              Data14: data.Data14,
              Data15: data.Data15,
              Data16: data.Data16,
              Data17: data.Data17,
              Data18: data.Data18,
              Data19: data.Data19
            };
          }
        )
      );
  }
}
