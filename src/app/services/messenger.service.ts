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
  toPTGraph = new Subject<[string, number[]]>();
  toFMGraph = new Subject<[string, number[]]>();
  toLCGraph = new Subject<[string, number[]]>();

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

  public sendToPTGraph(message)
  {
    this.toPTGraph.next(message);
  }

  public sendToFMGraph(message)
  {
    this.toFMGraph.next(message);
  }

  public sendToLCGraph(message)
  {
    this.toLCGraph.next(message);
  }
}
