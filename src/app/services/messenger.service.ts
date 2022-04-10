import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor() { }

  toDiagram = new Subject<string>();
  toSequencing = new Subject<string>();
  toQueue = new Subject<string[]>();
  toTCGraph = new Subject<[string, number[]]>();

  /*
    to do: create an object that passes information
    from sequencing to diagram and vice versa

    Note: The Raspi itself is going to send updates 
    to the UI/Raspi is sending the valve states 
    themself to the ground station

    For debugging purposes, we could include a 
    some means of changing valve sequences
    this may be kept on the Raspi
  */

  public sendToDiagram(message)
  {
    this.toDiagram.next(message);
  }

  public sendQueuedValves(message)
  {
    this.toQueue.next(message);
  }

  public sendToSequencing(message)
  {
    this.toSequencing.next(message);
  }

  public sendToTCGraph(message)
  {
    this.toTCGraph.next(message);
  }
}
