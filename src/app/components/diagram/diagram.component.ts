import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss'],
})
export class DiagramComponent implements OnInit {
  constructor(private dataService: DataService) {}

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
  ]);

  public toggleColor(buttonNum) {
    // method to toggle color of buttons
    console.log(buttonNum);
    if (this.map.get(buttonNum) === 'closed') {
      document.getElementById(buttonNum).style.backgroundColor = '#32CD32';
      this.map.set(buttonNum, 'open');
    } else if (this.map.get(buttonNum) === 'open') {
      document.getElementById(buttonNum).style.backgroundColor = 'red';
      this.map.set(buttonNum, 'closed');
    }
  } // ends toggleColor

  ngOnInit(): void {} //ends void
}
