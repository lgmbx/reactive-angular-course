import {Component, OnInit} from '@angular/core';
import { MessageService } from './messages/message.service';
import { AuthStore } from './services/auth.store';
import { LoadingService } from './services/loading.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements  OnInit {

    constructor(public authStore: AuthStore) {
      
    }

    ngOnInit() {
      

    }

  logout() {
    this.authStore.logout();
  }

}
