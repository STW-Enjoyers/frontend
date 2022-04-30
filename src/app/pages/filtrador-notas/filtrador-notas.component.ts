import { Component, OnInit, ViewChild } from '@angular/core';
import * as FiltradorNotasConstants from "./filtrador-notas.constants";
import {CUPOS} from "./filtrador-notas.constants";
import {GradesService} from "../../services/grades.service";
import {Grade} from "../../models/Grade";
import {Subject} from "rxjs";
import {DataTableDirective} from "angular-datatables";

@Component({
  selector: 'app-filtrador-notas',
  templateUrl: './filtrador-notas.component.html',
  styleUrls: ['./filtrador-notas.component.css']
})
export class FiltradorNotasComponent implements OnInit {
  // Constants
  title_input:string = FiltradorNotasConstants.TITLE_INPUT;
  text_after_input:string = FiltradorNotasConstants.TEXT_AFTER_INPUT;
  title_select:string = FiltradorNotasConstants.TITLE_SELECT;
  placeholder = FiltradorNotasConstants.PLACEHOLDER;
  cupos = FiltradorNotasConstants.CUPOS;
  grades: Grade[] = [];
  // Filter values
  search!: string; /* Search bar value */
  cupoIndex:number = 0;
  cupo = CUPOS[this.cupoIndex] /* Actual cupo filtered */
  // Datatables attributes
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  datatableElement!: DataTableDirective;

  constructor(private gradesService: GradesService) { }

  ngOnInit(): void {
    // Add custom filters (name and city)
    this.setExternalFilter()
    // Config datatables
    this.dtOptions = FiltradorNotasConstants.DTOPTIONS
    // Get grades and initialize datatables
    this.getGrades();
  }

  // Get grades and update datatables
  getGrades(): void {
    this.gradesService
      .getGrades()
      .subscribe((grades) =>{
        grades = this.gradesService.filterByType(grades, this.gradesService.TYPES.GRADO);
        grades = this.gradesService.filterByCupo(grades, this.gradesService.CUPOS.GENERAL)
        grades = this.gradesService.renameCareers(grades);
        this.grades = grades;
        // Workaround to init datatables with dtOptions
        setTimeout(function() {
          // @ts-ignore
          this.dtTrigger.next();
        }.bind(this));
      })
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

  }

}
