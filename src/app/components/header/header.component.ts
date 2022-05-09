import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {
  }

  goToPage(link:string): void {
    this.router.navigate([link])
  }

  verifyLogin() {
    return this.userService.isLoggedIn()
  }

  logoff() {
    this.userService.unSetToken()
    this.router.navigate([''])
  }

}
