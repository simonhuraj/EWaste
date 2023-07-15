import { Component } from '@angular/core';
import {User} from "../../entitites/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private readonly userService: UserService) {
  }

  loginUser: User = new User('', '');

  hide = true;

  onSubmit(): void {
    this.userService.login(this.loginUser);
  }

}
