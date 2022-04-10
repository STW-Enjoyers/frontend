import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import * as HomeConstants from "./home.constants";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Constants
  textHelp:string = HomeConstants.HELP_MESSAGE;
  textUnizarLink:string = HomeConstants.HELP_REDIRECT;
  welcomeCards= HomeConstants.WELCOME_CARDS;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  goToPage(link:string): void {
    this.router.navigate([link]);
  }
}
