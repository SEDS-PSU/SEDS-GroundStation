import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor() { }

  toDiagram = new Subject<string>();
  toSequencing = new Subject<string>();

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

  public sendToSequencing(message)
  {
    this.toSequencing.next(message);
  }

  /*
    I may set up a way to show valves that will be changed
    on screen based on the selected step. For example, buttons
    flashing yellow to indicate which will change.
  */


}
