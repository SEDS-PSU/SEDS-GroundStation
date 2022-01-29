import { Injectable } from '@angular/core';
import { Observable,  Subject} from 'rxjs';
import { CommunicationService } from "./communication.service";
import { map } from 'rxjs/operators'; 

const CHAT_URL = "ws://echo.websocket.org/";

export interface Message{
  author: string;
  message: string;
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
              author: data.author,
              message: data.message   
            };
          }
        )
      );
  }
}
