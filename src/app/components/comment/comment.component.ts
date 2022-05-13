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
  /******** Inputs ********/
  // User id (required to check if a comment is liked by the actual user)
  @Input() userId!: string;
  // Grade where this comment is published
  @Input() gradeId!: string;
  // Comment with author, likes and responses to display
  @Input() comment!: Comment;

  /******** Outputs ********/
  // When a response is added to comment, emit an event
  @Output() reloadData: EventEmitter<string> = new EventEmitter();

  /********* State **********/
  // Show / hide responses
  responsesAreShown: boolean = false;
  // Comment is liked by user with userId
  isUpvoted:boolean = false;
  // Show / hide response input text
  responseInputIsShown:boolean = false;
  // New response current text
  newResponseText!:string;
  // Time since comment was published. For ex: hace 2h, hace 5minutos, hace 1dia ....
  timeSinceWasPublished!:string;


  constructor(public userService: UserService, private forumService: ForumService, private router: Router) { }

  ngOnInit(): void {
    this.validateInputs()
    this.isUpvoted = this.comment.upvotedUsers.includes(this.userId);
    this.timeSinceWasPublished = this.getTimeSinceWasPublished()
  }

  validateInputs() {
    // Check userId
    if (this.userService.isLoggedIn()) {
      if ((!this.userId || this.userId === "")) throw new Error("comment.component: userId es vacio o nulo!!")
    }
    // Check gradeId
    if ((!this.gradeId || this.gradeId === "")) throw new Error("comment.component: gradeId es vacio o nulo!!")


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
    if (this.userService.isLoggedIn()) {
      if (this.newResponseText && this.newResponseText.length > 0) {
        this.forumService.postResponse(this.gradeId, this.comment._id, this.newResponseText).subscribe(
          (res: any) => {
            //Comment has changed
            this.reloadData.emit()
          })
      }
    } else {
      this.redirectToLogin()
    }
  }

  // Like button has been pressed
  onUpVote() {
    if (this.userService.isLoggedIn()) {
      // Case user is logged
      if (this.isUpvoted) {
        //Case user had liked the comment before
        this.isUpvoted = false;
        this.comment.upvotes -= 1;
        this.forumService.postDownvote(this.gradeId, this.comment._id).subscribe()
      } else {
        this.isUpvoted = true;
        this.comment.upvotes += 1;
        this.forumService.postUpvote(this.gradeId, this.comment._id).subscribe();
      }
    } else {
      this.redirectToLogin()
    }
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onResponsesChanged() {
    this.reloadData.emit()
  }

  getUsername():string {
    let username:string
    if(this.comment.visible) {
      username =  this.comment.username
    } else {
      if (this.comment.status === "banned") {
        username =  "[baneado]"
      } else {
        username = "[borrado]"
      }
    }
    return username
  }

  getBody():string {
    let body:string
    if(this.comment.visible) {
      body =  this.comment.body
    } else {
      if (this.comment.status === "banned") {
        body =  "[Este usuario ha sido baneado]"
      } else {
        body = "[Este comentario ha sido borrado]"
      }
    }
    return body
  }

  // TODO: Refactorizar este tocho xd
  getTimeSinceWasPublished() {
    let diffTime = Math.abs(Date.now() - new Date(this.comment.date).getTime()); //milliseconds
    let diffSeconds =  Math.floor(diffTime / (1000));
    let diffMinutes = Math.floor(diffSeconds / (60));
    let diffHours = Math.floor(diffMinutes / (60));
    let diffDays = Math.floor(diffHours / (24));
    let diffWeeks = Math.floor(diffDays / (7));
    let diffMonths = Math.floor(diffDays / (30));
    let diffYears = Math.floor(diffDays / (365));

    //console.log(diffTime + " " + diffSeconds + " " + diffMinutes + " "
    //  + diffHours + " " + diffDays + " " + diffWeeks + " " + diffMonths + " " + diffYears)

    if (diffYears > 0) {
      return diffYears + " año" + this.formatDateText(diffYears, "año")
    } else if (diffMonths > 0) {
      return diffMonths + " mes" + this.formatDateText(diffMonths, "mes")
    } else if (diffWeeks > 0) {
      return diffWeeks + " semana" + this.formatDateText(diffWeeks, "semana")
    } else if (diffDays > 0) {
      return diffDays + " dia" + this.formatDateText(diffDays, "dia")
    } else if (diffHours > 0) {
      return diffHours + " hora" + this.formatDateText(diffHours, "hora")
    } else if (diffMinutes > 0) {
      return diffMinutes + " minuto" + this.formatDateText(diffMinutes, "minuto")
    } else if (diffSeconds > 0) {
      return diffSeconds + " segundo" + this.formatDateText(diffSeconds, "segundo")
    } else {
      return 0 + " segundos" + this.formatDateText(diffSeconds, "segundo")
    }
  }

  formatDateText(number: number, timeUnit:string) {
    return (timeUnit === "mes")
      ?(number == 1) ? '' : 'es'
      :(number == 1) ? '' : 's'
  }


}
