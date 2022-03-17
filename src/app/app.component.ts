import {Component, OnInit} from '@angular/core';
import { MessageService } from './messages/message.service';
import { LoadingService } from './services/loading.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements  OnInit {

    constructor() {
      
    }

    ngOnInit() {
      

    }

  logout() {

  }

}
