import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  user: any;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    console.log('LLEGUE');
    this.userService.getProfile().subscribe(
      (res: any) => {
        this.user = res['user'];
      },
      (err) => {}
    );
  }

  onLogout() {
    this.userService.unSetToken();
    this.router.navigateByUrl('/login');
  }
}
