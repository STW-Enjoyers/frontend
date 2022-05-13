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
import {debounceTime, fromEvent, Subscription} from "rxjs";

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
  max_comments_per_page:number = PerfilCarreraConstants.MAX_COMMENTS_PER_PAGE;
  visible_comments!:number;

  // Actual grade profile
  gradeProfile!: GradeProfile;
  // Grade prifile performance chart
  pieChart:any = []
  lineChart:any = []
  // Input comment text value
  newCommentText!:string;
  // Select
  order = [this.option_relevance, this.option_date]
  selected:string = this.option_relevance
  // Scroll observable from event
  scroller!: Subscription;
  showGoUpButton: boolean = false;

  constructor(private forumService: ForumService,
              public userService: UserService,
              private activatedroute:ActivatedRoute) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    // Get profile id from url data
    let id=this.activatedroute.snapshot.paramMap.get("id");
    //var localStorageGrade = JSON.parse(<string>localStorage.getItem('grade')) as Grade
    if (id) {
      // this.grade = localStorageGrade;
      this.getGradeProfileData(id, true)
      // Subscribe to scroll event
      this.scroller = fromEvent(window, 'scroll')
        .pipe(debounceTime(200))
        .subscribe(() => this.onScroll(window.scrollY));
    } else {
      throw new Error("perfil-carrera: ngOnInit: El id de la carrera es nulo")
    }
  }

  // Get gradeProfile (Chart data and comments)
  getGradeProfileData(idCarrera:string, updateChart:boolean): void {
    this.forumService
      .getGradeProfile(idCarrera)
      .subscribe((gradeProfile) =>{
        this.gradeProfile = gradeProfile
        this.orderResponses()
        this.orderComments(this.option_relevance)
        this.visible_comments = (this.gradeProfile.comments.length > this.max_comments_per_page)
          ? this.max_comments_per_page
          : this.gradeProfile.comments.length;


        if(updateChart) {
          this.performanceGrades()
          this.historicalGrades(this.gradeProfile._id)
        }
      })
  }

  performanceGrades() {
    this.pieChart = new Chart('rendimientoChart', {
      type: 'pie',
      data: {
        labels: PerfilCarreraConstants.CHART_PIE_LABELS,
        datasets: [{
          data: [this.gradeProfile.graduated, this.gradeProfile.changed, this.gradeProfile.abandoned],
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
            label: this.gradeProfile.estudio + "-" + this.gradeProfile.localidad,
            borderColor: "#3e95cd",
          }],
        },
        options: {
          maintainAspectRatio: false,
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
      this.gradeProfile.comments.sort( (a, b) => {
        return b.upvotes - a.upvotes
      })
    } else if (order=== this.option_date) {
      // Order by comment date
      this.gradeProfile.comments.sort( (a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    } else {
      throw new Error("perfil-carrera.component.ts: orederComments: Unexpected order");
    }
  }

  // Order responses by relevance
  orderResponses() {
    this.gradeProfile.comments.map((comment:Comment) => {
      comment.responses.sort( (a, b) => {
        return b.upvotes - a.upvotes
      })
    })
  }

  postComment() {
    console.log("BEARER: " + this.userService.getToken())
    console.log("gradeId: " + this.gradeProfile._id)
    if (this.newCommentText && this.newCommentText.length > 0) {
      this.forumService.postComment(this.gradeProfile, <Comment>{body: this.newCommentText}).subscribe(
        (res: any) => {
          // Reset input
          this.newCommentText = ""
          this.onCommentsHaveChanged()
        })
    }
  }

  onCommentsHaveChanged() {
      this.getGradeProfileData(this.gradeProfile._id, false)
  }

  onShowMoreComments() {
    this.visible_comments = (this.visible_comments + this.max_comments_per_page > this.gradeProfile.comments.length)
      ? this.gradeProfile.comments.length
      : this.visible_comments + this.max_comments_per_page;
  }

  onScroll(height:number) {
    this.showGoUpButton = height > 30;
  }
  onGoUp() {
    window.scroll(0,0);
  }
}
