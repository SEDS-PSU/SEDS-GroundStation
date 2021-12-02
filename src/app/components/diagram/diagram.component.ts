import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit {
  constructor() {}

  map = new Map([
    ['FO-P', false],
    ['FO-FP', false],
    ['FO-OP', false], // map of all our valves and their state
    ['FC-OP', false], // closed/off corresponds to false, open/on corresponds to true
    ['FC-FP', false],
    ['FC1-O', false],
    ['FC2-O', false],
    ['FO-O', false],
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
    ['FO-O', false],
    ['FC-P', false],
    ['PV-F', false],
    ['PV-O', false],
    ['KILL', false]
  ];

  /* each sequence is given a name, each valve to be open is listed
  add each sequence once we know what they are.
  */
  sequenceList = new Map([
    ['Sequence 1', [
      'FO-P',
      'FO-FP',
      'FO-OP'
    ]]
  ]);

  /* method to iterate through and update 
    each valve when a sequence is selected
  */
  public changeValveSequence(sequenceNum) {

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
      let sequence = this.sequenceList.get(sequenceNum);

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

/* below is the code for the killswitch timer
  It uses the builtin setInterval function to
*/
  timeLeft: number = 5; // time for timer in seconds
  interval;
  killed = 'false';
  public startTimer() {
    if(this.killed == 'true'){
      this.killed = 'false';
      document.getElementById('KILL').innerHTML = '5';
      document.getElementById('KILL').style.backgroundColor = 'red';
      document.getElementById("WARNING").style.visibility = "hidden";
      console.log(this.timeLeft);
      if(this.timeLeft <= 1){
        console.log("HERE");
        this.map.set('KILL', false);
      }
      this.timeLeft = 5;
      clearInterval(this.interval);
    }
    else{
      this.killed = 'true';
      this.interval = setInterval(() => {
        if(this.timeLeft > 1) {
          this.timeLeft--;
          if(this.timeLeft % 2 == 0){
            document.getElementById('KILL').style.backgroundColor = 'black';
            document.getElementById("WARNING").style.visibility = "visible";
          }
          else{
            document.getElementById('KILL').style.backgroundColor = 'red';
            document.getElementById("WARNING").style.visibility = "hidden";
          }
          document.getElementById('KILL').innerHTML = String(this.timeLeft);
        } else {
          this.timeLeft--;
          document.getElementById('KILL').innerHTML = 'X';
          document.getElementById("WARNING").style.visibility = "visible";
          this.toggleState('KILL');
          //this.timeLeft = 5;  // reset timer when hit 0
          clearInterval(this.interval);
        }
      },1000)
    } // ends else

  }

  ngOnInit(): void {} //ends void
}
