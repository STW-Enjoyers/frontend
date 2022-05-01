import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Response} from "../../models/Response";
import {Router} from "@angular/router";
import {ForumService} from "../../services/forum.service";

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {
  isUpvoted:boolean = false;
  @Input() userId!: string;
  @Input() gradeId!: string;
  @Input() commentId!: string;
  @Input() response!: Response;
  // When something change, emit event
  @Output() hasChanged: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private forumService: ForumService) { }

  ngOnInit(): void {
    this.isUpvoted = this.response.upvotedUsers.includes(this.userId);
  }

  // Like button has been pressed and user is logged
  onUpVote() {
    (this.response.upvotedUsers.includes(this.userId))
      ? this.forumService.postDownvote(this.gradeId, this.commentId, this.response._id)
      : this.forumService.postUpvote(this.gradeId, this.commentId, this.response._id);
    // comment has changed
    this.hasChanged.emit()
  }

  // Like or reply button have been pressed and user is not logged
  redirectToRegister() {
    this.router.navigate(['registro']);
  }
}
