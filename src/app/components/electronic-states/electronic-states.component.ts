import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-electronic-states',
  templateUrl: './electronic-states.component.html',
  styleUrls: ['./electronic-states.component.scss']
})
export class ElectronicStatesComponent implements OnInit {
  toggleVerificationSubscription:Subscription;
  toggleDownloadingDataSubscription:Subscription;
  toggleCommunicationSubscription:Subscription;

  constructor(private comm:CommunicationService, private dataSharing: DataSharingService) {
    this.toggleVerificationSubscription = this.dataSharing.getToggleVerificationEvent().subscribe(()=>{
      this.toggleVerification();
    })
    this.toggleDownloadingDataSubscription = this.dataSharing.getDataDownloadingEvent().subscribe(()=>{
      this.toggleDownloadingData();
    })
  }
  isVerification;
  public toggleVerification(){
    this.isVerification = !this.isVerification;
    if(this.isVerification){
      document.getElementById("valveVerification").className = "led-green"; 
    }
    else{
      document.getElementById("valveVerification").className = "led-red";
    }
  }

  isDownloadingData;
  public toggleDownloadingData(){
    this.isDownloadingData = !this.isDownloadingData;
    if(this.isDownloadingData){
      document.getElementById("downloadButton").className = "led-green"; 
    }
    else{
      document.getElementById("downloadButton").className = "led-red"; 
    }
  }

  isComm;
  public toggleCommunication(){
    this.isComm = !this.isComm;
    if(this.isComm){
      document.getElementById("connection").className = "led-green"; 
    }
    else{
      document.getElementById("connection").className = "led-red"; 
    }
  }

  ngOnInit(): void {
    this.isVerification = true;
    this.isDownloadingData = false;
    this.isComm = false;
  }

}
