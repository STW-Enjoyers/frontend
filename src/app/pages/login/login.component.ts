import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(public userService: UserService, public router: Router) {}

  model = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}
  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res: any) => {
        console.log('Sin problema man');
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/ajustes-usuario');
      },
      //(err) => {}
    );
  }
}
