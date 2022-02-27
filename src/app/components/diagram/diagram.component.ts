import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit {

  constructor(private message:MessengerService) { }

  //there are 10 valves
<<<<<<< Updated upstream
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
    ['PV-F', false], //***********false is set to NITROGEN PATHWAY***********
    ['PV-O', false], //***********false is set to NITROGEN PATHWAY***********
=======
  map = new Map([ // map of all our valves and their state
    ['FC-FP', false], // closed/off corresponds to false, open/on corresponds to true
    ['FO-P1', false],
    ['PV-F', false], //***********false is set to NITROGEN PATHWAY***********
    ['FO-FP', false], 
    ['FC-P', false],
    ['PV-O', false], //***********false is set to NITROGEN PATHWAY***********
    ['FC2-O', false],
    ['FO-P2', false],
>>>>>>> Stashed changes
    ['KILL', false]
  ]);

  resetSequence: [string, boolean][] = [ //valves with their base state
    ['FC-FP', false],
    ['FO-P1', false],
    ['PV-F', false], 
    ['FO-FP', false], 
    ['FC-P', false],
    ['PV-O', false],
    ['FC2-O', false],
    ['FO-P2', false],
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

  //lets the queued valves blink
  public queuedState(queued:string[])
  {
    for(var [key, value] of this.map.entries()) 
    {
      document.getElementById(key).style.borderColor = 'grey';
    }

    for(var [key, value] of this.map.entries()) 
    {
      for(let i = 0; i < queued.length; i++)
      {
        let valve = queued[i];
        if(valve == key)
          document.getElementById(valve).style.borderColor = 'yellow';
      }
    }
  }

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
    this.message.toQueue.subscribe(
      {
        next: y => this.queuedState(y)
      }
    )
  } //ends void
}