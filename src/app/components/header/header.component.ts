import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //User info
  username:string = ""
  admin:boolean = false

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    if(this.verifyLogin()) {
      this.userService.getProfile().subscribe(data => {
        this.username = data.username
        this.admin = data.admin
      })
    }
  }

  goToPage(link:string): void {
    this.router.navigate([link])
  }

  verifyLogin() {
    return this.userService.isLoggedIn()
  }

  verifyAdmin() {
    return this.admin
  }

  onLogout() {
    this.userService.unSetToken()
    this.username = ""
    this.admin = false

    this.router.navigate([''])
  }

}
