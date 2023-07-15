import { Injectable } from '@angular/core';
import {User} from "../entitites/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, EMPTY} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | undefined;

  private serverUrl = 'http://localhost:8080'

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  login(user: User) {
    this.http.post<boolean>(this.serverUrl + '/user/login', user).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    ).subscribe(value => {
      this.storeUser(user)
      this.user = user;
      this.router.navigateByUrl('');
    });
  }

  logout(): void {
    this.removeUser();
    this.router.navigateByUrl('/login');
  }

  get authorizationHeader() {
    if (!this.user) return {};
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${this.user.username}:${this.user.password}`)
      })
    };
  }

  private getUser(): User | undefined {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) return undefined;
    return new User(username, password);
  }

  private storeUser(user: User): void {
    localStorage.setItem('username', user.username);
    localStorage.setItem('password', user.password);
  }

  private removeUser(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }
}
