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
    ['FO-P', 'closed'],
    ['FO-FP', 'closed'],
    ['FO-OP', 'closed'], // map of all our valves and their state
    ['FC-OP', 'closed'],
    ['FC-FP', 'closed'],
    ['FC1-O', 'closed'],
    ['FC2-O', 'closed'],
    ['FO-O', 'closed'],
    ['FC-P', 'closed'],
    ['PV-F', 'closed'],
    ['PV-O', 'closed'],
    ['KILL', 'off']
  ]);

  public toggleState(buttonNum) {
    // method to toggle color of buttons
    if(this.map.get('KILL') === 'off'){ // if kill switch is toggled we don't want to be able to change valve states
      if (this.map.get(buttonNum) === 'closed') { // if the button pressed is closed set value to open and change color
          document.getElementById(buttonNum).style.backgroundColor = '#32CD32';
          this.map.set(buttonNum, 'open');
      } else if (this.map.get(buttonNum) === 'open') {
          document.getElementById(buttonNum).style.backgroundColor = 'red';
          this.map.set(buttonNum, 'closed');
      } else if (this.map.get(buttonNum) === 'off'){ // if kill switch is pressed, set value to 'on' and reset all valve values to off
          for(var [key, value] of this.map.entries()){
            document.getElementById(key).style.backgroundColor = 'red';
            this.map.set(key, 'closed');
          } // resets states to closed
          document.getElementById(buttonNum).style.backgroundColor = 'black';
          this.map.set(buttonNum, 'on');
      }
    }
  } // ends toggleColor

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
        this.map.set('KILL', 'off');
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
