import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {Category} from "../entitites/category";
import {HttpClient} from "@angular/common/http";
import {apiUrl} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly userService: UserService, private readonly http: HttpClient) { }

  getAllCategories(): Observable<Category> {
    return this.http.get<Category>(apiUrl, this.userService.authorizationHeader);
  }
}
