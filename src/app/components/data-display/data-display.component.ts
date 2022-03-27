import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
})
export class DataDisplayComponent implements OnInit {
  constructor(private dataService: DataService, private sanitizer: DomSanitizer, private message:MessengerService) {}

  

  timeLeft: number = 5;
  interval;
  formData = new FormData();
  output = "";
  newTCData:[string, number][] = [
    ['TC1-F', 0],
    ['TC2-F', 0],
    ['TC1-O', 0],
    ['TC5-O', 0],
    ['TC1-E', 0],
    ['TC2-E', 0]
  ];

  public dataCollection(){
    this.interval = setInterval(() => {
      this.timeLeft += 1;
      this.output += this.dataService.data[0];
      document.getElementById('PT1-F').innerHTML = String(this.dataService.data[0]);
      document.getElementById('PT2-F').innerHTML = String(this.dataService.data[1]);
      document.getElementById('PT1-O').innerHTML = String(this.dataService.data[2]);
      document.getElementById('TC1-F').innerHTML = String(this.dataService.data[3]);
      document.getElementById('TC2-F').innerHTML = String(this.dataService.data[4]);
      document.getElementById('TC1-O').innerHTML = String(this.dataService.data[5]);

      //Updates values so they may be sent to the graphs:
      this.newTCData = [
        ['TC1-F', Number(this.dataService.data[3])],//Number(this.dataService.data[3])],
        ['TC2-F', Number(this.dataService.data[4])],
        ['TC1-O', Number(this.dataService.data[5])]
      ];

      this.message.sendToTCGraph(this.newTCData);

    },1000)
  }

  name = 'Angular 5';
  fileUrl;
  public recordDataStart(){}
  public recordDataStop(){}
  public downloadData(){
    //this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }



  ngOnInit(): void {
    this.dataCollection();
    var fileText = this.output;
    var fileName = "DATA_HERE.txt"
    var blob = new Blob([fileText], {type: 'text/plain'})
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
}
