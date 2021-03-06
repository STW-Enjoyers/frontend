import {Component, OnInit, ViewChild} from '@angular/core';
import * as ListaCarrerasConstants from "./lista-carreras.constants";
import {GradesService} from "../../services/grades.service";
import {HttpResponse} from "@angular/common/http";
import {Grade} from "../../models/Grade";
import {Subject} from "rxjs";
import {DataTableDirective} from "angular-datatables";
import {CITIES} from "./lista-carreras.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-carreras',
  templateUrl: './lista-carreras.component.html',
  styleUrls: ['./lista-carreras.component.css']
})
export class ListaCarrerasComponent implements OnInit {
  // Constants
  title:string = ListaCarrerasConstants.TITLE;
  placeholder = ListaCarrerasConstants.PLACEHOLDER;
  grades: Grade[] = [];
  // Filter values
  search!: string; /* Search bar value */
  cityIndex:number = 0;
  city = CITIES[this.cityIndex] /* Actual city displayed (Zaragoza or Huesca or ..) */
  // Datatables attributes
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  datatableElement!: DataTableDirective;

  constructor(private router: Router, private gradesService: GradesService) { }

  ngOnInit(): void {
    // Add custom filters (name and city)
    this.setExternalFilter()
    // Config datatables
    this.dtOptions = ListaCarrerasConstants.DTOPTIONS
    // Get grades and initialize datatables
    this.getGrades();
  }

  ngOnDestroy(): void {
    // Reset data table every time we leave the page
    this.dtTrigger.unsubscribe();
    // Delete custom filters
    this.unsetExternalFilter()
  }

  // Get grades and update datatables
  getGrades(): void {
    this.gradesService
      .getGrades()
      .subscribe((grades) =>{
        grades = this.gradesService.filterByType(grades, this.gradesService.TYPES.GRADO);
        grades = this.gradesService.filterByCupo(grades, this.gradesService.CUPOS.GENERAL);
        grades = this.gradesService.renameCareers(grades);
        this.grades = grades;
        // Workaround to init datatables with dtOptions
        setTimeout(function() {
          // @ts-ignore
          this.dtTrigger.next();
        }.bind(this));
      })
  }

  nextCity() {
    this.cityIndex = this.mod(this.cityIndex + 1, CITIES.length)
    this.city = CITIES[this.cityIndex]
    this.updateDatatables()
  }

  previousCity() {
    this.cityIndex = this.mod(this.cityIndex - 1, CITIES.length)
    this.city = CITIES[this.cityIndex]
    this.updateDatatables()
  }

  // Update datatables when a user inserts a custom search or city changes
  updateDatatables(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  // Set an external filter to search by grade name and city
  // Code modified from: http://l-lin.github.io/angular-datatables/#/advanced/custom-range-search
  setExternalFilter() {
    $.fn['dataTable'].ext.search.push((settings: any, data: string[], dataIndex: any) => {
      const estudio:string = data[0]; // use data for the Carrera column
      const ciudad:string = data[2]; // use data for the Ciudad column
      // Formatted data
      let formattedEstudio = estudio.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      let formattedSearch:string = (this.search)
        ? this.search.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        : "";
      if (ciudad.includes(this.city.name)
          && (formattedSearch == ""
              || formattedEstudio.includes(formattedSearch))
              || formattedSearch.includes(formattedEstudio)
              || this.levenshteinDistance(formattedEstudio, formattedSearch) <= 3
      ) {
        return true;
      }
      return false;
    });
  }

  // Unset an external filter to search by grade name
  // Code modified from: http://l-lin.github.io/angular-datatables/#/advanced/custom-range-search
  unsetExternalFilter() {
    // /!\ This is not the ideal solution as other components may add other search function in this array, so be careful when
    // handling this global variable
    $.fn['dataTable'].ext.search.pop();
  }

  navigateToProfile(grade: Grade) {
    // We need to pass the grade object to grade profile page.
    // Doing it with local storage is a temporal solution.
    // This will need a design rethinking
    localStorage.setItem('grade', JSON.stringify(grade));
    this.router.navigate(['perfil-carrera']);
  }
  // Calculate modulus.
  // % is not a modulus operator. It is a remainder operator
  mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  // Lexicographic distance algorithm to applay to degree filter
   levenshteinDistance (str1 = '', str2 = '') {
    const track = Array(str2.length + 1).fill(null).map(() =>
      Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator, // substitution
        );
      }
    }
    return track[str2.length][str1.length];
  };
}
