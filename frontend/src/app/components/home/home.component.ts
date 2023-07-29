import {Component} from '@angular/core';
import {ManagerService} from "../../services/api/manager.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title: string = 'E-Waste';

  constructor(
    private readonly userService: ManagerService,
  ) {}

  logOut() {
    this.userService.logout();
  }

}
