import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {Category} from "../entitites/category";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly serverUrl = 'http://localhost:8080/category';

  constructor(private readonly userService: UserService, private readonly http: HttpClient) { }

  getAllCategories(): Observable<Category> {
    return this.http.get<Category>(this.serverUrl, this.userService.authorizationHeader);
  }
}
