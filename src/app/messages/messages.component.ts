import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { MessageService } from "./message.service";

@Component({
  selector: "messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  showMessages: boolean = false;
  error$: Observable<any>;
  constructor(public messageServices: MessageService) {}

  ngOnInit() {
    this.error$ = this.messageServices.errors$
      .pipe(
        tap(() => this.showMessages = true)
      )
  }

  onClose() {
    this.showMessages = false;
  }
}
