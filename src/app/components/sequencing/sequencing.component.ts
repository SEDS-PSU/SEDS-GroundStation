import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../../services/messenger.service';
import { SequenceService } from '../../services/sequence.service';

@Component({
  selector: 'app-sequencing',
  templateUrl: './sequencing.component.html',
  styleUrls: ['./sequencing.component.scss']
})
export class SequencingComponent implements OnInit {
  selected:SequenceService;

  constructor(private message:MessengerService) {
    this.selected = new SequenceService();
  }

  //sequencing diagram interaction
  public messageDiagram(item:string[]) {
    this.message.sendToDiagram(item); 
  }

  private showMessage(x) {
    document.getElementById('tester').innerHTML = x;
  }

  //menu stuff:
  public selectSequence()
  {
    //selects the sequence in the dropdown menu
    this.selected.select('test');

    //updates the UI to show what step is selected
    document.getElementById('currentstep').innerHTML = 'Current Step: '+(this.selected.getCurrentStep()+1)
      +"/"+(this.selected.getCurrentSequenceLength());
    this.showStepData();
  }

  //button
  public advanceStep()
  {
    //moves forward one step in the sequence, regardless of wait time
    if(this.selected.getCurrentStep() < (this.selected.getCurrentSequenceLength() - 1))
    {
      this.selected.forward();

      //updates the UI to show what step is selected
      document.getElementById('currentstep').innerHTML = 'Current Step: '+(this.selected.getCurrentStep()+1)
        +"/"+(this.selected.getCurrentSequenceLength());
      this.showStepData();
    }
  }

  //button
  public reverseStep()
  {
    //moves backward one step
    if(this.selected.getCurrentStep() > 0)
    {
      this.selected.backward();

      //updates the UI to show what step is selected
      document.getElementById('currentstep').innerHTML = 'Current Step: '+(this.selected.getCurrentStep()+1)
        +"/"+(this.selected.getCurrentSequenceLength());
      this.showStepData();
    }
  }

  //button
  public confirmAdvance()
  {
    //confirms and activates step, also prompts an "are you sure" message
    //if the step includes a wait timer, it will show a countdown to next step
    if(confirm("Are you sure to apply the currently selected step?") && this.selected.selectedSequence != 'none')
    {
      this.messageDiagram(this.selected.getCurrentStepData());
    }

    this.advanceStep();
  }

  //updates UI to show what valves will open when the sequence step is pushed
  private showStepData()
  {
    var valveUpdate:string = "Valves to open: ";
    var sequenceData:string[];

    sequenceData = this.selected.getCurrentStepData();

    for(let i = 0; i < sequenceData.length; i++)
    {
      if(i < sequenceData.length-1)
        valveUpdate += sequenceData[i]+', ';
      else
        valveUpdate += sequenceData[i];
    }

    document.getElementById('stepinfo').innerHTML = valveUpdate;
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
