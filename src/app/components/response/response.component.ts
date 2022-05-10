import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Response} from "../../models/Response";
import {Router} from "@angular/router";
import {ForumService} from "../../services/forum.service";
import {UserService} from "../../services/user.service";

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
  @Output() reloadData: EventEmitter<string> = new EventEmitter();
  constructor(public userService:UserService, private router: Router, private forumService: ForumService) { }

  ngOnInit(): void {
    this.isUpvoted = this.response.upvotedUsers.includes(this.userId);
  }

  // Like button has been pressed and user is logged
  onUpVote() {
    if (this.userService.isLoggedIn()) {
      // Case user is logged
      if (this.response.upvotedUsers.includes(this.userId)) {
        //Case user had liked the comment before
        this.isUpvoted = false;
        this.response.upvotes -= 1;
        this.forumService.postDownvote(this.gradeId, this.commentId, this.response._id).subscribe()
      } else {
        this.isUpvoted = true;
        this.response.upvotes += 1;
        this.forumService.postUpvote(this.gradeId, this.commentId, this.response._id).subscribe();
      }
    }
  }

  // Like or reply button have been pressed and user is not logged
  redirectToRegister() {
    this.router.navigate(['registro']);
  }
}
