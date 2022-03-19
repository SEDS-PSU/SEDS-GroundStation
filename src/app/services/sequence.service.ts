import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {
  selectedSequence:string;
  selectedSteps:string[][];
  selectedWait:number[];
  selectedNote:string[];
  step:number;

  /*
    This service holds all data for sequences, valve states, wait times
    there should be 12 valves
    there are 18 states to write up
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
    20, 
    5, 
    0
  ];

  testNote:string[] = [
    'These are test sequences.',
    'They don\'t actually exist.',
    'yo'
  ];

  /*ETHANOL FILL & NITROUS HOOKUP SEQUENCE
    Note: All of the computer-controlled valves are set to closed, only things changed are manual valves.
    Hence, this doesn't really do anything.
  */
  ethanolFill:string[][] = [
    [] //all closed, PV-F set to nitrogen pathway, ***********false is set to NITROGEN PATHWAY***********
  ];

  ethanolFillWait:number[] = [
    0
  ];

  ethanolFillNote:string[] = [
    'All computer-controlled valves are set to their default state in this sequence and do not change. This sequence does nothing.'
  ]

  /*NITROUS FILL SEQUENCE
    
  */
  nitrousFill:string[][] = [
    ['FC1-O'],
    [],
    ['FC1-O'],
    []
  ];

  nitrousFillWait:number[] = [
    0, 
    0, 
    5, 
    0
  ];

  nitrousFillNote:string[] = [
    'Opens FC1-O.',
    'Closes FC1-O after 22.2 kg on load cell. If pressure is too high, open FC2-O.',
    'FC1-O opens again only for 5 seconds.',
    'FC1-O closes.'
  ];

  /*PRE-TEST PURGE

  */
  preTestPurge:string[][] = [
    ['FC-P'],
    [],
    ['FO-P'],
    [],
    ['FC-P'],
    []
  ]; 

  preTestPurgeWait:number[] = [
    15,
    0,
    30,
    0,
    15,
    0
  ];

  preTestPurgeNote:string[] = [
    "Opens FC-P for 15 seconds or until PT1-P reads ***NA*** psi. Please check UI, ensure PV-F and PV-O are not flowing to the engine. Ensure FO-P, FC-FP, and FC-OP are closed.",
    "Closes FC-P", //***NA*** doesn't say on NETS operations procedures
    "Opens FO-P, purge starts. Wait until 30 seconds to close or until PT1-P reads 15 psi.", 
    "Closes FO-P",
    "Opens FC-P. Wait 15 seconds, or until PT1-P ***NA*** psi.",
    "Closes FC-P."

  ];

  /*HOT-FIRE
    Note: most of this is quick and should be done by the raspi, not the ground station.
  */
  hotFire:string[][] = [
    ['FC-FP', 'FC-OP'],
    ['FC-FP', 'FC-OP', 'PV-F', 'PV-O'], 
    /*
      At this point, the raspi should do all the work, these are here for testing.
      Purge means nitrogen pathway I think.
      Also not sure if the FC-FP and FC-OP should stay open in the following step.
    */
    ['FC-FP', 'FC-OP', 'FO-P']
  ];

  hotFireWait:number[] = [
    0,
    0,
    0,
  ];

  hotFireNote:string[] = [
    "Opens FC-FP and FC-OP. Wait until tanks reach ***NA***. Ensure TC1-O is within 40-60 F. Ensure nitrous pressure is within ***NA***.",//also not yet on the operational procedures spreadsheet
    "Set PV-F and PV-O to propellant position. Ensure EV1-O and EV1-F are open (are these controlled by UI?). (then testfire?)",
    "Opens FO-P, PV-F, and PV-O to purge. Ensure EV1-O and EV1-F are closed."
  ];

  /*POST-TEST OPS

  */
  postTestOPS:string[][] = [
    [],
    ['FC2-O'],
    ['FC2-O', 'FC-OP'],
    ['FC2-O'],
    ['FC2-O', 'FC-FP'],
    ['FC2-O'],
    []

  ];

  postTestOPSWait:number[] = [
    0,
    5,
    5,
    0,
    0,
    0,
    0,
  ]

  postTestOPSNote:string[] = [
    "This step ensures that FC-OP is closed. Basically closes everything but DEFINITELY check to be sure this is right.",
    "Opens FC2-O, waits for 5 seconds. This remains open for the following few steps.",
    "Opens FC-OP for 5 seconds, FC2-O remains open.",
    "Closes FC-OP, FC2-0 remains open. The test stand should be monitored for safing.",
    "Opens FC-FP. Purges ethanol tank.",
    "Closes FC-FP.",
    "Closes FC2-O."
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
      this.selectedSteps = this.testSteps;
      this.selectedWait = this.testWait;
      this.selectedNote = this.testNote;
    }
    else if(selected == 'ethanol fill')
    {
      this.selectedSteps = this.ethanolFill;
      this.selectedWait = this.ethanolFillWait;
      this.selectedNote = this.ethanolFillNote;
    }
    else if(selected == 'nitrous fill')
    {
      this.selectedSteps = this.nitrousFill;
      this.selectedWait = this.nitrousFillWait;
      this.selectedNote = this.nitrousFillNote;
    }
    else if(selected == 'pre-test purge')
    {
      this.selectedSteps = this.preTestPurge;
      this.selectedWait = this.preTestPurgeWait;
      this.selectedNote = this.preTestPurgeNote;
    }
    else if(selected == 'hot-fire')
    {
      this.selectedSteps = this.hotFire;
      this.selectedWait = this.hotFireWait;
      this.selectedNote = this.hotFireNote;
    }
    else if(selected == 'post-test ops')
    {
      this.selectedSteps = this.postTestOPS;
      this.selectedWait = this.postTestOPSWait;
      this.selectedNote = this.postTestOPSNote;
    }

  }

  public getStepData()
  {
    return this.selectedSteps[this.step];
  }

  public getStepNote()
  {
    return this.selectedNote[this.step];
  }

  public getWaitTime()
  {
    return this.selectedWait[this.step];
  }

  public getSequenceLength()
  {
    return this.selectedSteps.length;
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
