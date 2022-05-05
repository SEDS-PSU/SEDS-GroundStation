import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-tc-graph',
  templateUrl: './tc-graph.component.html',
  styleUrls: ['./tc-graph.component.scss']
})
export class TcGraphComponent implements OnInit {
  TC_chart:Chart;
  TC_data:[string, number[]][];
  //for keeping track of how many labels there are
  numLabels:number = 30;

  constructor(private message:MessengerService) {
    this.TC_data = [
      ['TC1-F', [
        5, 10, 15, 20, 15, 17, 9, 5, 5, 90,
        5, 10, 15, 20, 15, 17, 9, 5, 5, 90,
        5, 10, 15, 20, 15, 17, 9, 5, 5, 90
      ]],
      ['TC2-F', [
        15, 20, 22, 13, 4, 14, 2, 1, 2, 10,
        15, 20, 22, 13, 4, 14, 2, 1, 2, 10,
        15, 20, 22, 13, 4, 14, 2, 1, 2, 10
      ]]
    ];
  }

  public updateValues(newData)
  {
    //update the values on each graph
    for (let i = 0; i < newData.length; i++) {
      let sensor = newData[i][0];
      let newValue = newData[i][1];

      for(let j = 0; j < this.TC_data.length; j++)
      {
        if(this.TC_data[j][0] == sensor)
        {
          for(let k = 0; k < this.numLabels; k++)
          {
            //take the one above and make it the one previous
            if(k != this.numLabels-1)
            {
              this.TC_data[j][1][k] = this.TC_data[j][1][k+1];
            }
            else
            {
              this.TC_data[j][1][k] = newValue;
            }
          }
        }
      }
    }

    this.TC_chart.update()
  }

  ngOnInit(): void {
    this.TC_chart = new Chart("thermoChart", {
      type: 'line',
      data: {
        labels: [
          'T+30', 'T+29', 'T+28', 'T+27', 'T+26', 'T+25', 'T+24', 'T+23', 'T+22', 'T+21',
          'T+20', 'T+19', 'T+18', 'T+17', 'T+16', 'T+15', 'T+14', 'T+13', 'T+12', 'T+11',
          'T+10', 'T+9', 'T+8', 'T+7', 'T+6', 'T+5', 'T+4', 'T+3', 'T+2', 'T+1'],
        datasets: 
        [
          {
            label: 'TC1-F',
            data: this.TC_data[0][1],
            backgroundColor: [
              'rgba(255, 99, 132, 0.0)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              /*'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'*/
            ],
            borderWidth: 3
          },
          {
            label: 'TC2-F',
            data: this.TC_data[1][1],
            backgroundColor: [
              'rgba(255, 99, 132, 0.0)'
            ],
            borderColor: [
              'rgba(99, 255, 132, 1)',
              /*'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'*/
            ],
            borderWidth: 3
          }
      ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        animation: {
          duration: 0
        }
      }
    });

    //for recieving graph updates
    this.message.toTCGraph.subscribe(
      {
        next: x => this.updateValues(x)
      }
    );
  }
}
