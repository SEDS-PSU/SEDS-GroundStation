import { R3ExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  constructor() { }

  private subject: Subject<MessageEvent>;
  private subject1: Subject<any>;

  public connect(url): Subject<MessageEvent> {
    if(!this.subject){
      this.subject = this.create(url);
    }
    return this.subject;
  }


  private create(url): Subject<MessageEvent> {
    console.log(url);
    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if(ws.readyState === WebSocket.OPEN){
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
