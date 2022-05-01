import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
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

  // Different cities
  CITIES = {
    ZARAGOZA: "Zaragoza",
    TERUEL: "Teruel",
    HUESCA: "Huesca",
    ALMUNIA: "Almunia de Doña Godina (La)"
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
    switch (type) {
      case this.TYPES.GRADO:
        return grades.filter(grade => grade.estudio.includes(this.TYPES.GRADO))
      case this.TYPES.MASTER:
        return grades.filter(grade => grade.estudio.includes(this.TYPES.MASTER))
      case this.TYPES.DOCTORADO:
        return grades.filter(grade => grade.estudio.includes(this.TYPES.DOCTORADO))
      default:
        throw new Error("gradesService: filterByType: Incorrect type " + type)
    }
  }

  // Filter careers, masters or doctor'degrees
  filterByCupo(grades: Grade[], cupo:string): Grade[] {
    switch (cupo) {
      case this.CUPOS.DEPORTISTAS_ALTO_NIVEL:
        return grades.filter(grade => grade.cupo.includes(this.CUPOS.DEPORTISTAS_ALTO_NIVEL))
      case this.CUPOS.DEPORTISTAS_ALTO_RENDIMIENTO:
        return grades.filter(grade => grade.cupo.includes(this.CUPOS.DEPORTISTAS_ALTO_RENDIMIENTO))
      case this.CUPOS.DISCAPACIDAD:
        return grades.filter(grade => grade.cupo.includes(this.CUPOS.DISCAPACIDAD))
      case this.CUPOS.GENERAL:
        return grades.filter(grade => grade.cupo.includes(this.CUPOS.GENERAL))
      case this.CUPOS.MAS25:
        return grades.filter(grade => grade.cupo.includes(this.CUPOS.MAS25))
      case this.CUPOS.MAS40:
        return grades.filter(grade => grade.cupo.includes(this.CUPOS.MAS40))
      case this.CUPOS.MAS45:
        return grades.filter(grade => grade.cupo.includes(this.CUPOS.MAS45))
      default:
        throw new Error("gradesService: filterByCupo: Incorrect cupo " + cupo)
    }
  }

  // Filter careers, masters or doctor'degrees
  filterByCity(grades: Grade[], city:string): Grade[] {
    switch (city) {
      case this.CITIES.ZARAGOZA:
        return grades.filter(grade => grade.localidad.includes(this.CITIES.ZARAGOZA))
      case this.CITIES.TERUEL:
        return grades.filter(grade => grade.localidad.includes(this.CITIES.TERUEL))
      case this.CITIES.HUESCA:
        return grades.filter(grade => grade.localidad.includes(this.CITIES.HUESCA))
        case this.CITIES.ALMUNIA:
        return grades.filter(grade => grade.localidad.includes(this.CITIES.ALMUNIA))
      default:
        throw new Error("gradesService: filterByCity: Incorrect city " + city)
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
