import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UserService } from "../../services/user.service";
import { ForumService } from "../../services/forum.service";
import { GradesService } from "../../services/grades.service";
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
  mainTitle:string = DashboardConstants.MAIN_TITLE
  yearlyChartTitle:string = DashboardConstants.YEARLY_CHART_TITLE
  commentChartTitle:string = DashboardConstants.COMMENT_CHART_TITLE
  conflictChartTitle:string = DashboardConstants.CONFLICT_CHART_TITLE
  commentModTitle:string = DashboardConstants.COMMENT_MOD_TITLE

  // Botones
  anteriorBtn:string = DashboardConstants.ANTERIOR_BTN
  verificarBtn:string = DashboardConstants.VERIFICAR_BTN
  borrarBtn:string = DashboardConstants.BORRAR_BTN
  banearBtn:string = DashboardConstants.BANEAR_BTN
  siguienteBtn:string = DashboardConstants.SIGUIENTE_BTN

  // Moderación
  indiceModerar:number = 1
  maxModerar:number = 5

  listaComentarios:any = []
  tipoComentario:string = ""
  usuarioComentario:string = ""
  textoComentario:string = ""
  idComentario:string = ""
  idRespuesta:string = ""
  idCarrera:string = ""
  idUsuario:string = ""

  chart:any = []

  constructor(
    private userService: UserService,
    private gradesService: GradesService, 
    private forumService: ForumService,
    private modService: ModerationService) { 
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.startYearlyChart()
    this.startForumModCharts()
    this.getModComments()
  }

  startYearlyChart() {
    let idMonth:string[] = []
    let numUsers:number[] = []

    this.userService.getYearly().subscribe(
      (yearlyUsers: YearlyUsers[]) => {

        yearlyUsers = this.orderYear(yearlyUsers)

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

  orderYear(yearlyUsers: YearlyUsers[]) {
    let auxYearlyUsers:YearlyUsers[] = []

    for (let i = 0; i < 12; i++) {
      let id = yearlyUsers[i]._id
      if(id.startsWith("1-") || id.startsWith("01-")) {auxYearlyUsers[0] = yearlyUsers[i]}
      if(id.startsWith("2-") || id.startsWith("02-")) {auxYearlyUsers[1] = yearlyUsers[i]}
      if(id.startsWith("3-") || id.startsWith("03-")) {auxYearlyUsers[2] = yearlyUsers[i]}
      if(id.startsWith("4-") || id.startsWith("04-")) {auxYearlyUsers[3] = yearlyUsers[i]}
      if(id.startsWith("5-") || id.startsWith("05-")) {auxYearlyUsers[4] = yearlyUsers[i]}
      if(id.startsWith("6-") || id.startsWith("06-")) {auxYearlyUsers[5] = yearlyUsers[i]}
      if(id.startsWith("7-") || id.startsWith("07-")) {auxYearlyUsers[6] = yearlyUsers[i]}
      if(id.startsWith("8-") || id.startsWith("08-")) {auxYearlyUsers[7] = yearlyUsers[i]}
      if(id.startsWith("9-") || id.startsWith("09-")) {auxYearlyUsers[8] = yearlyUsers[i]}
      if(id.startsWith("10-")) {auxYearlyUsers[9] = yearlyUsers[i]}
      if(id.startsWith("11-")) {auxYearlyUsers[10] = yearlyUsers[i]}
      if(id.startsWith("12-")) {auxYearlyUsers[11] = yearlyUsers[i]}
    }

    return auxYearlyUsers
  }

  startForumModCharts() {
    let grade:string[] = []
    let count:number[] = []

    this.forumService.getCommented().subscribe(
      (GradeCommented: GradeCommented[]) => {

        GradeCommented = GradeCommented.map(grade => <GradeCommented>{
          ...grade,
          estudio: grade.estudio.replace("Grado:", "")
        })

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

        GradeConflictive = GradeConflictive.map(grade => <GradeConflictive>{
          ...grade,
          estudio: grade.estudio.replace("Grado:", "")
        })

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

  getModComments() {
    this.modService.getComments().subscribe(data => {
      this.listaComentarios = data;
      this.indiceModerar = 1
      this.maxModerar = this.listaComentarios.length
      this.changeModComment(0)
    })
  }

  changeModComment(indice:number) {
    this.tipoComentario = this.listaComentarios[indice].type
    this.usuarioComentario = this.listaComentarios[indice].username
    this.textoComentario = this.listaComentarios[indice].body
    this.idComentario = this.listaComentarios[indice].commentId
    this.idCarrera = this.listaComentarios[indice].degreeId
    this.idUsuario = this.listaComentarios[indice].userid
    if(this.tipoComentario == "response") {
      this.idRespuesta = this.listaComentarios[indice].responseId
    }
    //console.log(this.listaComentarios[indice])
  }

  nextModComment() {
    if(this.indiceModerar < this.maxModerar) {
      this.indiceModerar++
      this.changeModComment(this.indiceModerar-1)
    }
  }

  previousModComment() {
    if(this.indiceModerar > 1) {
      this.indiceModerar--
      this.changeModComment(this.indiceModerar-1)
    }
  }

  checkModComments() {
    return this.maxModerar > 0
  }

  verifyComment() {
    if(this.tipoComentario == "comment") {
      this.modService.verifyComment(this.idCarrera, this.idComentario).subscribe(data => {
        //console.log(data)
      })
    } else if (this.tipoComentario == "response") {
      this.modService.verifyResponse(this.idCarrera, this.idComentario, this.idRespuesta).subscribe(data => {
        //console.log(data)
      })
    }

    this.listaComentarios.forEach((comment: any,index: any)=>{
      if(comment.commentId == this.idComentario) this.listaComentarios.splice(index,1);
    });

    this.maxModerar--
    if (this.maxModerar < this.indiceModerar) {
      this.indiceModerar = this.maxModerar
    }

    this.changeModComment(this.indiceModerar-1)
  }

  deleteComment() {
    if(this.tipoComentario == "comment") {
      this.modService.deleteComment(this.idCarrera, this.idComentario).subscribe(data => {
        //
      })
    } else if (this.tipoComentario == "response") {
      this.modService.deleteResponse(this.idCarrera, this.idComentario, this.idRespuesta).subscribe(data => {
        //
      })
    }

    this.listaComentarios.forEach((comment: any,index: any)=>{
      if(comment.commentId == this.idComentario) this.listaComentarios.splice(index,1);
    });

    this.maxModerar--
    if (this.maxModerar < this.indiceModerar) {
      this.indiceModerar = this.maxModerar
    }

    this.changeModComment(this.indiceModerar-1)
  }

  banUser() {
    this.modService.banUser(this.idUsuario).subscribe(data => {
      //
    })
    this.getModComments() //Actualizo lista
    this.changeModComment(0)
  }
}
