import { Component, OnInit} from '@angular/core';

@Component ({
 selector: 'app-check-engine', //app selector
 templateUrl: './check-engine.component.html', //location of template for app 
 styleUrls: ['./check-engine.component.scss']   //location of style for app 
})
export class CheckEngineComponent implements OnInit{
  constructor() {}

  ngOnInit(): void {}
    
}


/*NOT SURE IF WE WANT TO ADD FUNCTIONALITY TO CHECK ENGINE BUTTON,
 Created as an app in case we wanted to add functionality
 Can easily be recreated in the app.component.scss files as just a border with text
 if no functionality is desired */