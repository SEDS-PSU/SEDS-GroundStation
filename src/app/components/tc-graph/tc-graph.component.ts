import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-tc-graph',
  templateUrl: './tc-graph.component.html',
  styleUrls: ['./tc-graph.component.scss']
})
export class TcGraphComponent implements OnInit {

  constructor() { }

  /*Data sets on the plot
    data: holds single values shown on the chart
    label: the label of the data set
    fill: optional setting for the appearance of data
  */
  eventsData: ChartDataSets[] = [
    { data: [], label: 'Number of Events', fill: false }
  ];

  //Sets this up as a line chart
  eventsChartType = 'line';

  //The x axis
  eventsLabels: Label[] = [];

  //colors
  eventsColors: Color[] = [
    {
      borderColor: '#0000FF',
      pointBackgroundColor: '#FFFFFF'
    }
  ];

  //options, lot of options but here the animations are disabled for performance
  eventsOptions: ChartOptions = {
    animation: {
      duration: 0
    }
 };


  ngOnInit(): void {
  }

}
