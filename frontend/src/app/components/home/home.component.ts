import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title: string = 'E-Waste';

  constructor(private readonly userService: UserService, private readonly categoryService: CategoryService) {
  }

  logOut() {
    this.userService.logout();
  }

  category() {
    this.categoryService.getAllCategories().subscribe(value => console.log(value))
  }
}
