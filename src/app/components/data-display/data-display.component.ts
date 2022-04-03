import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommunicationService } from 'src/app/services/communication.service';
import { CommTestService } from 'src/app/services/comm-test.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
})
export class DataDisplayComponent implements OnInit {
  constructor(private dataService: DataService, private sanitizer: DomSanitizer, private commTest: CommTestService) {
    commTest.messages.subscribe(msg => {
      console.log("Response from websocket in data display: ", msg);
      this.data[0] = (Math.round(Number(msg.Data) * 100) / 100).toString();
      this.data[1] = (Math.round(Number(msg.Data1) * 100) / 100).toString();
      this.data[2] = (Math.round(Number(msg.Data2) * 100) / 100).toString();
      this.data[3] = (Math.round(Number(msg.Data3) * 100) / 100).toString();
      this.data[4] = (Math.round(Number(msg.Data4) * 100) / 100).toString();
      this.data[5] = (Math.round(Number(msg.Data5) * 100) / 100).toString();
      this.data[6] = (Math.round(Number(msg.Data6) * 100) / 100).toString();
      this.data[7] = (Math.round(Number(msg.Data7) * 100) / 100).toString();
      this.data[8] = (Math.round(Number(msg.Data8) * 100) / 100).toString();
      this.data[9] = (Math.round(Number(msg.Data9) * 100) / 100).toString();
      this.data[10] = (Math.round(Number(msg.Data10) * 100) / 100).toString();
      this.data[11] = (Math.round(Number(msg.Data11) * 100) / 100).toString();
      this.data[12] = (Math.round(Number(msg.Data12) * 100) / 100).toString();
      this.data[13] = (Math.round(Number(msg.Data13) * 100) / 100).toString();
      this.data[14] = (Math.round(Number(msg.Data14) * 100) / 100).toString();
      this.data[15] = (Math.round(Number(msg.Data15) * 100) / 100).toString();
      this.data[16] = (Math.round(Number(msg.Data16) * 100) / 100).toString();
      this.data[17] = (Math.round(Number(msg.Data17) * 100) / 100).toString();
      this.data[18] = (Math.round(Number(msg.Data18) * 100) / 100).toString();
      this.data[19] = (Math.round(Number(msg.Data19) * 100) / 100).toString();

    });
  }
  data: string[] = [];
  timeLeft: number = 5;
  interval;
  formData = new FormData();
  output = "";
  public dataCollection(){
    this.interval = setInterval(() => {
      this.timeLeft += 1;
      this.output += this.dataService.data[0];
      
      document.getElementById('TC1-E').innerHTML = String(this.data[0]);
      document.getElementById('TC2-E').innerHTML = String(this.data[1]);
      document.getElementById('TC1-F').innerHTML = String(this.data[2]);
      document.getElementById('TC2-F').innerHTML = String(this.data[3]);
      document.getElementById('TC1-O').innerHTML = String(this.data[4]);
      document.getElementById('TC5-O').innerHTML = String(this.data[5]);
      document.getElementById('FM-F').innerHTML = String(this.data[6]);
      document.getElementById('FM-O').innerHTML = String(this.data[7]);
      document.getElementById('Load1').innerHTML = String(this.data[8]);
      document.getElementById('Load2').innerHTML = String(this.data[9]);
      document.getElementById('PT1-F').innerHTML = String(this.data[10]);
      document.getElementById('PT2-F').innerHTML = String(this.data[11]);
      document.getElementById('PT1-E').innerHTML = String(this.data[12]);
      document.getElementById('PT2-E').innerHTML = String(this.data[13]);
      document.getElementById('PT1-O').innerHTML = String(this.data[14]);
      document.getElementById('PT2-O').innerHTML = String(this.data[15]);
      document.getElementById('PT4-O').innerHTML = String(this.data[16]);
      document.getElementById('PT1-P').innerHTML = String(this.data[17]);
      document.getElementById('PT2-P').innerHTML = String(this.data[18]);
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
