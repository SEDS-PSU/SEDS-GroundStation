import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { DataService } from '../../services/data.service';
import { CommTestService } from 'src/app/services/comm-test.service';
import { ThrowStmt } from '@angular/compiler';

//import { appendFile } from 'fs';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit {

  constructor(private message:MessengerService, private commTest: CommTestService) {
    commTest.messages.subscribe(msg => {
      //console.log("Response from the websocket: ", msg);
    })
  }

  map = new Map([
    ['FO_FP', true],
    ['FC_FP', false],
    ['FC_P', false], // map of all our valves and their state
    ['FC1_F', false], // closed/off corresponds to false, open/on corresponds to true
    ['FO_P1', true],
    ['FO2_O', true],
    ['FC4_O', false], //***********false is set to NITROGEN PATHWAY***********
    ['FC3_O', false], //***********false is set to NITROGEN PATHWAY***********
    ['PV_F', true],
    ['PV_O', true],
    ['KILL', false]
  ]);

  resetSequence: [string, boolean][] = [ // This is the base sequence where all valves are closed
    ['FO_FP', true],
    ['FC_FP', false],
    ['FC_P', false], // map of all our valves and their state
    ['FC1_F', false], // closed/off corresponds to false, open/on corresponds to true
    ['FO_P1', true],
    ['FO2_O', true],
    ['FC4_O', false], //***********false is set to NITROGEN PATHWAY***********
    ['FC3_O', false], //***********false is set to NITROGEN PATHWAY***********
    ['PV_F', true],
    ['PV_O', true],
    ['KILL', false]
  ];

    public ValveStates = {
      "SetValves" : {
        FO_FP: "closed",
        FC_FP: "closed",
        FC_P: "closed",
        FC1_F: "closed",
        FO_P1: "closed",
        FO2_O: "closed",
        FC4_O: "closed",
        FC3_O: "closed",
        PV_F: "nitrogen",
        PV_O: "nitrogen"
      }
  };

  public sendValveStates(){
    this.updateValveStates();
    console.log("Sending valve states ");
    this.commTest.valveMessages.next(this.ValveStates);
    console.log("Valve States Sent ", this.ValveStates);
    console.log("After sending valve states");
  }

  interval;
  timeLeft = 0;
  public async testFire(){
    this.commTest.valveMessages.next("Ignite");
    console.log("Ignited");
  }

  public delay(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  public updateValveStates(){
    if(this.map.get('FO_FP') === true){
      this.ValveStates.SetValves.FO_FP = "open";
    }
    else{
      this.ValveStates.SetValves.FO_FP = "closed";
    }

    if(this.map.get('FC_FP') === true){
      this.ValveStates.SetValves.FC_FP = "open";
    }
    else{
      this.ValveStates.SetValves.FC_FP = "closed";
    }
    
    if(this.map.get('FC_P') === true){
      this.ValveStates.SetValves.FC_P = "open";
    }
    else{
      this.ValveStates.SetValves.FC_P = "closed";
    }
    
    if(this.map.get('FC1_F') === true){
      this.ValveStates.SetValves.FC1_F = "open";
    }
    else{
      this.ValveStates.SetValves.FC1_F = "closed";
    }
    
    if(this.map.get('FO_P1') === true){
      this.ValveStates.SetValves.FO_P1 = "open";
    }
    else{
      this.ValveStates.SetValves.FO_P1 = "closed";
    }
    
    if(this.map.get('FO2_O') === true){
      this.ValveStates.SetValves.FO2_O = "open";
    }
    else{
      this.ValveStates.SetValves.FO2_O = "closed";
    }
    
    if(this.map.get('FC4_O') === true){
      this.ValveStates.SetValves.FC4_O = "open";
    }
    else{
      this.ValveStates.SetValves.FC4_O = "closed";
    }
    
    if(this.map.get('FC3_O') === true){
      this.ValveStates.SetValves.FC3_O = "open";
    }
    else{
      this.ValveStates.SetValves.FC3_O = "closed";
    }
    
    if(this.map.get('PV_F') === true){
      this.ValveStates.SetValves.PV_F = "nitrogen";
    }
    else{
      this.ValveStates.SetValves.PV_F = "fueloxidizer";
    }

    if(this.map.get('PV_O') === true){
      this.ValveStates.SetValves.PV_O = "nitrogen";
    }
    else{
      this.ValveStates.SetValves.PV_O = "fueloxidizer";
    }
  }

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
    console.log(buttonNum);
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
      this.sendValveStates();
    }
  }

  private pushMessage(x)
  {
    this.changeValveSequence(x);
  }

  ngOnInit(): void {
    //sequencing diagram interaction
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