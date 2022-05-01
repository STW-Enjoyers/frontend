import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ForumService} from "../../services/forum.service";
import {GradeProfile} from "../../models/GradeProfile";
import {Grade} from "../../models/Grade";
import { Chart, registerables } from 'chart.js';
import { Comment } from '../../models/Comment';
import {Response} from '../../models/Response';
import * as PerfilCarreraConstants from './perfil-carrera.constants'
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-perfil-carrera',
  templateUrl: './perfil-carrera.component.html',
  styleUrls: ['./perfil-carrera.component.css']
})
export class PerfilCarreraComponent implements OnInit {
  // Constants
  statistics_title = PerfilCarreraConstants.STATISTICS_TITLE;
  comments_title = PerfilCarreraConstants.COMMENTS_TITLE;
  comment_input_label = PerfilCarreraConstants.COMMENT_INPUT_LABEL;
  comment_button_text = PerfilCarreraConstants.COMMENT_BUTTON_TEXT;
  // Actual grade
  grade!: Grade;
  // Grade profile comments
  comments!: Comment[];
  // Grade prifile performance chart
  chart:any = []
  // Input comment text value
  newCommentText!:string;


  constructor(private forumService: ForumService,
              public userService: UserService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    // Get profile id from url data
    this.grade = history.state.data
    this.getGradeProfileData(this.grade.idCarrera)
  }

  // Get gradeProfile (Chart data and comments)
  getGradeProfileData(idCarrera:string): void {
    this.forumService
      .getGradeProfile(idCarrera)
      .subscribe((gradeProfile) =>{
        this.comments = gradeProfile.comments
        this.chart = new Chart('rendimientoChart', {
          type: 'pie',
          data: {
            labels: PerfilCarreraConstants.CHART_PIE_LABELS,
            datasets: [{
              data: [gradeProfile.graduated, gradeProfile.changed, gradeProfile.abandoned],
              borderWidth: 2,
              backgroundColor: PerfilCarreraConstants.CHART_PIE_COLORS,
            }],
          },
        })
      })
  }

  postComment() {
    console.log("postComment")
    console.log(localStorage.getItem('token'))
    console.log(this.grade.idCarrera)
    if (this.newCommentText && this.newCommentText.length > 0) {
      console.log("SEND POST TO BACKEND")
      this.forumService.postComment(this.grade, <Comment>{body: this.newCommentText}).subscribe(
        (res: any) => {
         console.log("RESPONSE RECEIVED")
          this.newCommentText = ""
          window.location.reload();
        })
    }
  }

}
