import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {
  selectedSequence:string;
  selectedStepSeries:string[][];
  selectedWaitSeries:number[];
  step:number;

  /*
    This service holds all data for sequences, valve states, wait times
    there will be either 10 or 11 actuated valves
  */

  //Steps and wait times:
  //open valves are listed, all others will be closed
  
  testSteps:string[][] = [
    ['FO-P', 'FO-FP', 'FO-OP'],
    ['FC-FP', 'FC1-O'],
    ['PV-F']
  ];

  //number of seconds wait after indicated index is performed on sequence
  testWait:number[] = [
    20, 5, 0
  ];

  constructor() {
    this.selectedSequence = "none";
   }

  public select(selected:string)
  {
    this.selectedSequence = selected;

    this.step = 0;

    //because there are only a few sequences, array will be selected by some if statements
    if(selected == 'test')
    {
      this.selectedStepSeries = this.testSteps;
      this.selectedWaitSeries = this.testWait;
    }
  }

  public getCurrentStepData()
  {
    return this.selectedStepSeries[this.step];
  }

  public getCurrentSequenceLength()
  {
    return this.selectedStepSeries.length;
  }

  public getSequenceName()
  {
    return this.selectedSequence;
  }

  public forward()
  {
    this.step++;
  }

  public backward()
  {
    this.step--;
  }

  public getCurrentStep()
  {
    return this.step;
  }
}
