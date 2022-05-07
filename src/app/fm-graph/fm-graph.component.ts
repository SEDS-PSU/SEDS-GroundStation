import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { MessengerService } from 'src/app/services/messenger.service';
import { DataDisplayComponent } from '../components/data-display/data-display.component';

@Component({
  selector: 'app-fm-graph',
  templateUrl: './fm-graph.component.html',
  styleUrls: ['./fm-graph.component.scss']
})
export class FmGraphComponent implements OnInit {
  mainChart:Chart;
  mainData:[string, number[]][];
  //for keeping track of how many labels and sensors there are
  numLabels:number = DataDisplayComponent.numberGraphLabels;
  numSensors:number = DataDisplayComponent.FMSensors.length;
  //Used for the graph's labels on the x axis (e.g 'T+1')
  xAxisLabels:string[];

  constructor(private message:MessengerService) {
    //Instantiate data sets, this assumes at most 10 sensors
    let tempSensors = DataDisplayComponent.FMSensors;
    this.mainData = [
      ['', Array(this.numLabels)],
      ['', Array(this.numLabels)],
      ['', Array(this.numLabels)],
      ['', Array(this.numLabels)],
      ['', Array(this.numLabels)],
      ['', Array(this.numLabels)],
      ['', Array(this.numLabels)],
      ['', Array(this.numLabels)],
      ['', Array(this.numLabels)],
      ['', Array(this.numLabels)]
    ]

    for(let i = 0; i < this.numSensors; i++) {
      this.mainData[i][0] = tempSensors[i];
    }

    //Populate labels
    this.xAxisLabels = Array(this.numLabels);

    for(let i = 0; i < this.numLabels; i++)
      this.xAxisLabels[i] = 'T+' + (this.numLabels-i);
  }

  public updateValues(newData)
  {
    //update the values on each graph
    for (let i = 0; i < newData.length; i++) {
      let sensor = newData[i][0];
      let newValue = newData[i][1];

      for(let j = 0; j < this.numSensors; j++)
      {
        if(this.mainData[j][0] == sensor)
        {
          for(let k = 0; k < this.numLabels; k++)
          {
            //take the one above and make it the one previous
            if(k != this.numLabels-1)
            {
              this.mainData[j][1][k] = this.mainData[j][1][k+1];
            }
            else
            {
              this.mainData[j][1][k] = newValue;
            }
          }
        }
      }
    }

    this.mainChart.update()
  }

  ngOnInit(): void {
    this.mainChart = new Chart("flowChart", {
      type: 'line',
      data: {
        labels: this.xAxisLabels,
        datasets: 
        []
      },
      options: {
        scales: {
        },
        animation: {
          duration: 0
        }
      }
    });

    for(let i = 0; i < this.numSensors; i++) {
      let rgbColor = '';

      switch (i % 3) {
        case 0:
          rgbColor = 'rgba(255, 99, 132, ';
          break;
        case 1:
          rgbColor = 'rgba(99, 255, 132, ';
          break;
        default:
          rgbColor = 'rgba(132, 99, 255, ';
      }

      const newDataSet = {
        label: this.mainData[i][0],
        data: this.mainData[i][1],
        backgroundColor: [
          rgbColor+' 0.0)'
        ],
        borderColor: [
          rgbColor+' 1)'
        ],
        borderWidth: 3,
        lineTension: 0
      };

      this.mainChart.data.datasets.push(newDataSet);
    }

    //for recieving graph updates
    this.message.toFMGraph.subscribe(
      {
        next: x => this.updateValues(x)
      }
    );
  }
}
