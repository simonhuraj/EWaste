import { Injectable } from '@angular/core';
import {User} from "../entitites/user";
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | undefined;

  private serverUrl = 'http://localhost:8080/'
  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  login(user: User) {
    this.http.post<boolean>(this.serverUrl + 'user/login', user).pipe(
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    ).subscribe(value => {
      this.storeUser(user)
      this.router.navigateByUrl('');
    });
  }


  private getUser(): User | undefined {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    console.log(username, password)
    if (!username || !password) return undefined;
    return new User(username, password);
  }

  private storeUser(user: User): void {
    localStorage.setItem('username', user.username);
    localStorage.setItem('password', user.password);
  }
}
