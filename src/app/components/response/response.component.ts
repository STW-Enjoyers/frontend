import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Response} from "../../models/Response";

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  @Input() response!: Response;
  @Output() upvote: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  // Likes button has been pressed
  onUpVote() {
    this.upvote.emit()
    this.response.isUpVoted = !this.response.isUpVoted
  }
}
