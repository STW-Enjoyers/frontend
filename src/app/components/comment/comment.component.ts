import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from '../../models/Comment';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ForumService} from "../../services/forum.service";
import {Grade} from "../../models/Grade";
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  // By default responses are hidden
  responsesAreShown: boolean = false;
  isUpvoted:boolean = false;
  responseInputIsShown:boolean = false;
  newResponseText!:string;
  // User id required to match if comment was liked by user
  @Input() userId!: string;
  // Grade where this comment is published
  @Input() gradeId!: string;
  // Comment with author, likes and responses to display
  @Input() comment!: Comment;
  // When something change, emit event
  @Output() hasChanged: EventEmitter<any> = new EventEmitter();

  constructor(public userService: UserService, private forumService: ForumService, private router: Router) { }

  ngOnInit(): void {
    console.log("USERID: " + this.userId)
    console.log("UPVOTED USERS: " +this.comment.upvotedUsers)
    this.isUpvoted = this.comment.upvotedUsers.includes(this.userId);
  }

  // Show/hide responses
  onShowResponses() {
    this.responsesAreShown = !this.responsesAreShown
    if (!this.responsesAreShown) this.responseInputIsShown = false
  }

  // Show/hide response input
  onShowResponseInput() {
    this.responseInputIsShown = !this.responseInputIsShown
    if (this.responseInputIsShown) this.responsesAreShown = true;
  }

  // Response publish button has been pressed
  onPostResponse() {
    if (this.newResponseText && this.newResponseText.length > 0) {
      this.forumService.postResponse(this.gradeId, this.comment._id, this.newResponseText).subscribe(
        (res: any) => {
          //Comment has changed
          this.hasChanged.emit()
        })
    }
  }

  // Like button has been pressed and user is logged
  onUpVote() {
    (this.comment.upvotedUsers.includes(this.userId))
      ? this.forumService.postDownvote(this.gradeId, this.comment._id).subscribe(
        (res: any) => {
          //Comment has changed
          this.hasChanged.emit()
        })
      : this.forumService.postUpvote(this.gradeId, this.comment._id).subscribe(
        (res: any) => {
          //Comment has changed
          this.hasChanged.emit()
        });
    // comment has changed
    this.hasChanged.emit()
  }

  onResponsesChanged() {
    this.hasChanged.emit()
  }

  // Like or reply button have been pressed and user is not logged
  redirectToRegister() {
    this.router.navigate(['registro']);
  }

}
