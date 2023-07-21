import { Component } from '@angular/core';
import {Manager} from "../../entitites/manager";
import {ManagerService} from "../../services/manager.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private readonly userService: ManagerService) {
  }

  loginUser: Manager = new Manager('', '');

  hide = true;

  onSubmit(): void {
    this.userService.login(this.loginUser);
  }

}
