import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { DataService } from '../../services/data.service';
//import { appendFile } from 'fs';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit {

  constructor(private message:MessengerService) { }

  map = new Map([
    ['FO-P', false],
    ['FO-FP', false],
    ['FO-OP', false], // map of all our valves and their state
    ['FC-OP', false], // closed/off corresponds to false, open/on corresponds to true
    ['FC-FP', false],
    ['FC1-O', false],
    ['FC2-O', false],
    //['FO-O', false], //get rid of this valve
    ['FC-P', false],
    ['PV-F', false],
    ['PV-O', false],
    ['KILL', false]
  ]);

  resetSequence: [string, boolean][] = [
    ['FO-P', false],
    ['FO-FP', false],
    ['FO-OP', false], // This is the base sequence where all valves are closed
    ['FC-OP', false],
    ['FC-FP', false],
    ['FC1-O', false],
    ['FC2-O', false],
    //['FO-O', false],
    ['FC-P', false],
    ['PV-F', false],
    ['PV-O', false],
    ['KILL', false]
  ];

  /* method to iterate through and update 
    each valve when a sequence is selected
  */
  public changeValveSequence(sequence) {

    //valve sequence changes shouldn't happen when kill is active
    if(this.map.get('KILL') === false)
    {
      //first, default all to closed states
      for(let i = 0; i < this.resetSequence.length; i++) {
        let valve = this.resetSequence[i][0];
        let newState = this.resetSequence[i][1];

        if(this.map.has(valve) && !(valve === 'KILL')) {
          this.map.set(valve, newState);
        }
      }

      //second, set valves to selected sequence
      for(let i = 0; i < sequence.length; i++) {
        let valve = sequence[i];

        if(this.map.has(valve)) {
          this.map.set(valve, true); //sets the selected valve to open (true)
        }
      }
    }

    this.updateColor();
  } // ends changeValveSequence

  /* toggleState method changes the state of
    each button between true and false, kill switch
    will set all buttons to false
  */
  public toggleState(buttonNum) {
    
    if(this.map.get('KILL') === false && buttonNum !== 'KILL'){ // if kill switch is toggled we don't want to be able to change valve states
      if (this.map.get(buttonNum) === false) { // if the button pressed is closed set value to open and change color
          this.map.set(buttonNum, true);
      } 
      else if (this.map.get(buttonNum) === true) {
          this.map.set(buttonNum, false);
      } 

      this.updateColor();
    }
    else if (buttonNum === 'KILL') { // if kill switch is pressed, set value to 'on' and reset all valve values to off
      for(var [key, value] of this.map.entries()) {
        this.map.set(key, false);
      } // resets states to closed

      this.map.set(buttonNum, true);
      this.updateColor();
      document.getElementById(buttonNum).style.backgroundColor = 'black';
    }

  } // ends toggleState

  public updateColor() {

    for(var [key, value] of this.map.entries()) {
      if(value === false && key !== 'KILL') {
        document.getElementById(key).style.backgroundColor = 'red';
      }
      else if(value === true && key !== 'KILL') {
        document.getElementById(key).style.backgroundColor = '#32CD32';
      }
    }
  }

  /* 
    below is the code for the killswitch
  */
  public killSwitch() {
    if(this.map.get('KILL') == true) {
      document.getElementById('KILL').innerHTML = 'X';
      document.getElementById('KILL').style.backgroundColor = 'red';
      document.getElementById("WARNING").style.visibility = "hidden";
      console.log("HERE");
      this.map.set('KILL', false);
    }
    else {
      document.getElementById('KILL').innerHTML = 'RESET';
      document.getElementById("WARNING").style.visibility = "visible";
      this.toggleState('KILL');
    }

    this.messageSequencing()
  }

  //testing sequencing diagram interaction
  private messageSequencing()
  {
    this.message.sendToSequencing("Hey sequencing");
  }

  private pushMessage(x)
  {
    this.changeValveSequence(x);
  }

  ngOnInit(): void {
    //testing sequencing diagram interaction
    this.message.toDiagram.subscribe(
      {
        next: x => this.pushMessage(x)
      }
    );
  } //ends void
}