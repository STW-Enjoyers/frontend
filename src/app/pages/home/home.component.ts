import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {welcomeCards} from "./welcomeCards";
import {WelcomeCard} from "./WelcomeCard";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  textHelp:string = "¿No has encontrado lo que buscabas?";
  textUnizarLink:string = "https://www.unizar.es";
  cards:WelcomeCard[] = welcomeCards;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  goToPage(link:string): void {
    this.router.navigate([link]);
  }



}
