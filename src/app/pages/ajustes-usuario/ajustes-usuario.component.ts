import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-ajustes-usuario',
  templateUrl: './ajustes-usuario.component.html',
  styleUrls: ['./ajustes-usuario.component.css']
})
export class AjustesUsuarioComponent implements OnInit {
  user: any;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe(
      (res: any) => {
        this.user = res['user'];
      },
      (err) => {}
    );
    console.log(this.user);
  }

  onLogout() {
    this.userService.unSetToken();
    this.router.navigateByUrl('/login');
  }
}
