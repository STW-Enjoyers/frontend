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
  isUpvoted:boolean = false;
  @Input() userId!: string;
  @Input() comment!: Comment;
  @Output() showResponses: EventEmitter<boolean> = new EventEmitter();
  @Output() upvote: EventEmitter<any> = new EventEmitter();
  @Output() downvote: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.isUpvoted = this.comment.upvotedUsers.includes(this.userId);
  }

  // Ver respuestas button has been pressed
  onShowResponses() {
    this.showResponses.emit(!this.responsesAreShown)
    this.responsesAreShown = !this.responsesAreShown
  }

  // Likes button has been pressed
  onUpVote() {
    if (!this.comment.upvotedUsers.includes(this.userId)) {
      //User had not liked this comment
      this.upvote.emit()
      this.isUpvoted = true
    } else {
      this.downvote.emit()
      this.isUpvoted = false
    }
  }

}
