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
    var localStorageGrade = JSON.parse(<string>localStorage.getItem('grade')) as Grade
    if (localStorageGrade) {
      this.grade = localStorageGrade;
    } else {
      throw new Error("perfil-carrera: ngOnInit: El id de la carrera es nulo")
    }
    this.getGradeProfileData(this.grade.idCarrera, true)
  }

  // Get gradeProfile (Chart data and comments)
  getGradeProfileData(idCarrera:string, updateChart:boolean): void {
    this.forumService
      .getGradeProfile(idCarrera)
      .subscribe((gradeProfile) =>{
        this.comments = gradeProfile.comments
        if(updateChart) {
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
        }
      })
  }

  postComment() {
    if (this.newCommentText && this.newCommentText.length > 0) {
      this.forumService.postComment(this.grade, <Comment>{body: this.newCommentText}).subscribe(
        (res: any) => {
          // Reset input
          this.newCommentText = ""
          this.onCommentsHaveChanged()
        })
    }
  }

  onCommentsHaveChanged() {
    // Update comments
    this.getGradeProfileData(this.grade.idCarrera, false)
  }

}
