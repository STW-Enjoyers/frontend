import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from 'src/environments/environment';
import { Grade } from '../models/Grade';
@Injectable({
  providedIn: 'root'
})
export class GradesService {
  // Types of grades.
  // From backend we get -> "estudio": "Máster: Investigación en Filosofía",
  TYPES = {
    GRADO: "Grado:",
    MASTER: "Máster:",
    DOCTORADO: "Doctorado:"
  }

  // Special conditions
  CUPOS = {
    DEPORTISTAS_ALTO_NIVEL: "Deportistas de alto nivel",
    DEPORTISTAS_ALTO_RENDIMIENTO: "Deportistas de alto rendimiento",
    DISCAPACIDAD: "Discapacidad",
    GENERAL: "General",
    MAS25: "Mayores de 25 años",
    MAS40: "Mayores de 40",
    MAS45: "Mayores de 45",
    TITULADOS: "Titulados Universitarios ",
  }

  constructor(private http: HttpClient) {}

  /*
    Get all grades (careers, masters and doctor's degree)
    year: If undefined, it will return last year degrees
   */
  getGrades(year?:number): Observable<Grade[]> {
    let endpoint:string = year == undefined ? `/grades/last` : `/grades/${year}`
    return this.http.get<Grade[]>(environment.url + endpoint);
  }

  // Filter careers, masters or doctor'degrees
  filterByType(grades: Grade[], type:string): Grade[] {
    if (Object.values(this.TYPES).indexOf(type) > -1) {
      // Case expected type
      return grades.filter(grade => grade.estudio.includes(type))
    } else {
      throw new Error("gradesService: filterByType: Incorrect type " + type)
    }
  }

  // Filter careers, masters or doctor'degrees
  filterByCupo(grades: Grade[], cupo:string): Grade[] {
    if(Object.values(this.CUPOS).indexOf(cupo) > -1) {
      // Case expected cupo
      return grades.filter(grade => grade.cupo.includes(cupo))
    } else {
      throw new Error("gradesService: filterByCupo: Incorrect cupo " + cupo)
    }
  }

  // Before:    grade[i].estudio = "Grado: Ingeniería informática"
  // After:     grade[i].estudio = "Ingeniería informática"
  renameCareers(grades: Grade[]): Grade[] {
    return grades.map(grade => <Grade>{
      ...grade,
      estudio: grade.estudio.replace(this.TYPES.GRADO, "")
    })
  }
}
