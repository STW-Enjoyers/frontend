import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UserService } from "../../services/user.service";
import { ForumService } from "../../services/forum.service";
import { ModerationService } from "../../services/moderation.service";
import * as DashboardConstants from './admin-dashboard.constants'
import {YearlyUsers} from "../../models/YearlyUsers";
import {GradeCommented} from "../../models/GradeInfo";
import {GradeConflictive} from "../../models/GradeInfo";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  mainTitle:string = DashboardConstants.MAIN_TITLE;
  yearlyChartTitle:string = DashboardConstants.YEARLY_CHART_TITLE;
  commentChartTitle:string = DashboardConstants.COMMENT_CHART_TITLE;
  conflictChartTitle:string = DashboardConstants.CONFLICT_CHART_TITLE;
  commentModTitle:string = DashboardConstants.COMMENT_MOD_TITLE;

  chart:any = []

  constructor(
    private userService: UserService, 
    private forumService: ForumService,
    private modService: ModerationService) { 
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.startYearlyChart()
    this.startForumModCharts()
  }

  startYearlyChart() {
    let idMonth:string[] = []
    let numUsers:number[] = []

    this.userService.getYearly().subscribe(
      (yearlyUsers: YearlyUsers[]) => {
        for (let i = 0; i < 12; i++) {
          idMonth[i] = yearlyUsers[i]._id
          numUsers[i] = yearlyUsers[i].users
        }

        this.chart = new Chart('yearlyChart', {
          type: 'line',
          data: {
            labels: idMonth,
            datasets: [{
              label: 'Usuarios',
              data: numUsers,
              fill: true,
              borderColor: '#6257f8',
              tension: 0.1
            }],
          }
        })
    });
  }

  startForumModCharts() {
    let grade:string[] = []
    let count:number[] = []

    this.forumService.getCommented().subscribe(
      (GradeCommented: GradeCommented[]) => {
        console.log(GradeCommented)
        for (let i = 0; i < 5; i++) {
          grade[i] = GradeCommented[i].estudio
          count[i] = GradeCommented[i].commentCount
        }

        this.chart = new Chart('commentGradeChart', {
          type: 'bar',
          data: {
            labels: grade,
            datasets: [{
              label: 'Comentarios publicados',
              data: count,
              borderWidth: 2,
              backgroundColor: '#6257f8',
            }],
          },
          options: {
            indexAxis: 'y',
          }
        })
    });
    
    this.forumService.getConflictive().subscribe(
      (GradeConflictive: GradeConflictive[]) => {
        for (let i = 0; i < 5; i++) {
          grade[i] = GradeConflictive[i].estudio
          count[i] = GradeConflictive[i].deletedCount
        }

        this.chart = new Chart('conflictGradeChart', {
          type: 'bar',
          data: {
            labels: grade,
            datasets: [{
              label: 'Comentarios conflictivos',
              data: count,
              borderWidth: 2,
              backgroundColor: '#6257f8',
            }],
          },
          options: {
            indexAxis: 'y',
          }
        })
    });
  }

  
}
