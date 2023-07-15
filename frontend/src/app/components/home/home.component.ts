import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {CategoryService} from "../../services/category.service";
import {DialogService} from "../../services/dialog.service";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title: string = 'E-Waste';

  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
    private readonly dialog: DialogService,
    private readonly snackbar: SnackbarService,
  ) {}

  logOut() {
    this.userService.logout();
  }

  click() {
    this.dialog.openDialog('hello title', 'how are you?').subscribe(value => console.log(value))
  }
}
