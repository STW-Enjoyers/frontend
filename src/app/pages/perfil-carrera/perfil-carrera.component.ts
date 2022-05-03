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
  option_relevance = PerfilCarreraConstants.OPTION_RELEVANCE;
  option_date = PerfilCarreraConstants.OPTION_DATE;
  // Actual grade
  grade!: Grade;
  // Grade profile comments
  comments!: Comment[];
  // Grade prifile performance chart
  pieChart:any = []
  lineChart:any = []
  // Input comment text value
  newCommentText!:string;
  // Select
  order = [this.option_relevance, this.option_date]
  selected:string = this.option_relevance

  constructor(private forumService: ForumService,
              public userService: UserService) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    // Get profile id from url data
    var localStorageGrade = JSON.parse(<string>localStorage.getItem('grade')) as Grade
    if (localStorageGrade) {
      this.grade = localStorageGrade;
      this.getGradeProfileData(this.grade.idCarrera, true)
      this.historicalGrades(this.grade.idCarrera)
    } else {
      throw new Error("perfil-carrera: ngOnInit: El id de la carrera es nulo")
    }
  }

  // Get gradeProfile (Chart data and comments)
  getGradeProfileData(idCarrera:string, updateChart:boolean): void {
    this.forumService
      .getGradeProfile(idCarrera)
      .subscribe((gradeProfile) =>{
        this.comments = gradeProfile.comments
        this.orderComments(this.option_relevance)
        if(updateChart) {
          this.pieChart = new Chart('rendimientoChart', {
            type: 'pie',
            data: {
              labels: PerfilCarreraConstants.CHART_PIE_LABELS,
              datasets: [{
                data: [gradeProfile.graduated, gradeProfile.changed, gradeProfile.abandoned],
                borderWidth: 2,
                backgroundColor: PerfilCarreraConstants.CHART_PIE_COLORS,
              }],
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Rendimiento académio en último año.'
                }
              }
            }
          })
        }
      })
  }

  historicalGrades(idCarrera:string) {
    this.forumService.getHistoricalGrades(idCarrera).subscribe((grades:Grade[]) =>{
      let xValues:number[] = []
      let yValues:number[] = []
      // Ascending sort
      grades.sort( (a, b) => {
        return a.curso - b.curso
      })
      grades.forEach( grade => {
        xValues.push(grade.curso)
        yValues.push(grade.nota)
      })
      this.pieChart = new Chart('historicalGradesChart', {
        type: 'line',
        data: {
          labels: xValues,
          datasets: [{
            data: yValues,
            label: this.grade.estudio + "-" + this.grade.localidad,
            borderColor: "#3e95cd",
          }],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Evolución de la nota de corte'
            }
          }
        }
      })
    })
  }

  onOrderChange() {
    this.orderComments(this.selected)
  }

  orderComments(order:string) {
    if (order === this.option_relevance) {
      // order by relevance
      this.comments.sort( (a, b) => {
        return b.upvotes - a.upvotes
      })
    } else if (order=== this.option_date) {
      // Order by comment date
    } else {
      throw new Error("perfil-carrera.component.ts: orederComments: Unexpected order");
    }
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
