import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ForumService} from "../../services/forum.service";
import {GradeProfile} from "../../models/GradeProfile";
import {Grade} from "../../models/Grade";
import { Chart, registerables } from 'chart.js';
import { Comment } from '../../models/Comment';
import {Response} from '../../models/Response';

@Component({
  selector: 'app-perfil-carrera',
  templateUrl: './perfil-carrera.component.html',
  styleUrls: ['./perfil-carrera.component.css']
})
export class PerfilCarreraComponent implements OnInit {
  // Actual grade
  grade!: Grade;
  // Grade profile with comments and data to feed charts
  gradeProfile!: GradeProfile;
  chart:any = []
  comments:Comment[] = []

  constructor(private forumService: ForumService,  private route: ActivatedRoute) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    // Get profile id from url data
    this.grade = history.state.data
    this.getGradeProfileData(this.grade.idCarrera)
    this.getComments()
  }

  // Get grades and update datatables
  getGradeProfileData(idCarrera:string): void {
    this.forumService
      .getGradeProfile(idCarrera)
      .subscribe((gradeProfile) =>{
        this.gradeProfile = gradeProfile
        this.chart = new Chart('rendimientoChart', {
          type: 'pie',
          data: {
            labels: [
              "Graduados",
              "Cambio de carrera",
              "Abandono"
            ],
            datasets: [{
              data: [this.gradeProfile.graduated, this.gradeProfile.changed, this.gradeProfile.abandoned],
              borderWidth: 2,
              backgroundColor: ['#d91920', '#0baff0', '#f79517'],
            }],
          },
        })
      })
  }

  getComments() {
    // TODO: GET DATA FROM BACKEND
    var reponse: Response = {
      author: 'Javier Campos',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      upVotes: 0,
      isUpVoted: false
    }
    this.comments.push(
      <Comment>{
        author: 'Javier Fabra',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley o',
        upVotes: 6,
        responses: [reponse],
        isUpVoted: false,
      }
    )
  }

}
