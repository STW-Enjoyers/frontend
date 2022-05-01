import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from '../../models/Comment';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  // By default responses are hidden
  responsesAreShown: boolean = false;
  @Input() comment!: Comment;
  @Output() showResponses: EventEmitter<boolean> = new EventEmitter();
  @Output() upvote: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  // Ver respuestas button has been pressed
  onShowResponses() {
    this.showResponses.emit(!this.responsesAreShown)
    this.responsesAreShown = !this.responsesAreShown
  }

  // Likes button has been pressed
  onUpVote() {
    this.upvote.emit()
    this.comment.isUpVoted = !this.comment.isUpVoted
  }

}
