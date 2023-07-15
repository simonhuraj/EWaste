import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title: string = 'E-Waste';

  constructor(
    private readonly userService: UserService,
  ) {}

  logOut() {
    this.userService.logout();
  }

}
