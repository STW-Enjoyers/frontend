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
    console.log("init respuesta " + this.response.username)
    this.isUpvoted = this.response.upvotedUsers.includes(this.userId);
  }

  // Like button has been pressed and user is logged
  onUpVote() {
    if (this.userService.isLoggedIn()) {
      // Case user is logged
      if (this.isUpvoted) {
        //Case user had liked the comment before
        this.response.upvotedUsers = this.response.upvotedUsers.filter((userId) => userId != this.userId);
        this.response.upvotes -= 1;
        this.isUpvoted = false;
        this.forumService.postDownvote(this.gradeId, this.commentId, this.response._id).subscribe()
      } else {
        this.response.upvotedUsers.push(this.userId);
        this.response.upvotes += 1;
        this.isUpvoted = true;
        this.forumService.postUpvote(this.gradeId, this.commentId, this.response._id).subscribe();
      }
    } else {
      this.redirectToLogin()
    }
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  getUsername():string {
    let username:string
    if(this.response.visible) {
      username =  this.response.username
    } else {
      if (this.response.status === "banned") {
        username =  "[baneado]"
      } else {
        username = "[borrado]"
      }
    }
    return username
  }

  getBody():string {
    let body:string
    if(this.response.visible) {
      body =  this.response.body
    } else {
      if (this.response.status === "banned") {
        body =  "[Este usuario ha sido baneado]"
      } else {
        body = "[Este comentario ha sido borrado]"
      }
    }
    return body
  }
}
