import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { SequenceService } from '../../services/sequence.service';

@Component({
  selector: 'app-sequencing',
  templateUrl: './sequencing.component.html',
  styleUrls: ['./sequencing.component.scss']
})
export class SequencingComponent implements OnInit {
  sequenceService:SequenceService;

  constructor(private message:MessengerService) {
    this.sequenceService = new SequenceService();
  }

  //sequencing diagram interaction
  public messageDiagram(item:string[]) {
    this.message.sendToDiagram(item); 
  }

  private showMessage(x) {
    document.getElementById('tester').innerHTML = x;
  }

  //menu stuff:
  public selectSequence(seq:string)
  {
    //selects the sequence
    document.getElementById('sequence_title').innerHTML = 'Selected: '+seq;
    this.sequenceService.select(seq.toLowerCase());

    //updates the UI to show what step is selected
    document.getElementById('currentstep').innerHTML = 'Current Step: '+(this.sequenceService.getCurrentStep()+1)
      +"/"+(this.sequenceService.getSequenceLength());
    this.showStepData();
  }

  //button
  public advanceStep()
  {
    //moves forward one step in the sequence, regardless of wait time
    if(this.sequenceService.getCurrentStep() < (this.sequenceService.getSequenceLength() - 1))
    {
      this.sequenceService.forward();

      //updates the UI to show what step is selected
      document.getElementById('currentstep').innerHTML = 'Current Step: '+(this.sequenceService.getCurrentStep()+1)
        +"/"+(this.sequenceService.getSequenceLength());
      this.showStepData();
    }
  }

  //button
  public reverseStep()
  {
    //moves backward one step
    if(this.sequenceService.getCurrentStep() > 0)
    {
      this.sequenceService.backward();

      //updates the UI to show what step is selected
      document.getElementById('currentstep').innerHTML = 'Current Step: '+(this.sequenceService.getCurrentStep()+1)
        +"/"+(this.sequenceService.getSequenceLength());
      this.showStepData();
    }
  }

  //button
  public confirmAdvance()
  {
    //confirms and activates step, also prompts an "are you sure" message
    //if the step includes a wait timer, it will show a countdown to next step
    if(confirm("Are you sure to apply the currently selected step?") && this.sequenceService.selectedSequence != 'none')
    {
      this.messageDiagram(this.sequenceService.getStepData());
      this.advanceStep();
    }
  }

  //updates UI to show what valves will open when the sequence step is pushed
  private showStepData()
  {
    var valveUpdate:string = "";
    var valveData:string[];

    valveData = this.sequenceService.getStepData();

    //Lists valves in a string to be shown in html
    for(let i = 0; i < valveData.length; i++)
    {
      if(i < valveData.length-1)
        valveUpdate += valveData[i]+', ';
      else
        valveUpdate += valveData[i];
    }

    if(valveUpdate.length == 0)
      valveUpdate += "NONE";

    document.getElementById('stepinfo').innerHTML = valveUpdate;

    document.getElementById("notes").innerHTML = this.sequenceService.getStepNote();
  }

  //button
  public cancelSequence()
  {
    //clears out the sequence, leaves valves in their current state, stops any countdown. 
  }

  ngOnInit(): void {
    //testing sequencing diagram interaction
    this.message.toSequencing.subscribe(
      {
        next: x => this.showMessage(x)
      }
    );
  }

}
