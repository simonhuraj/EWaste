import {Injectable} from '@angular/core';
import {User} from "../entitites/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, EMPTY} from "rxjs";
import {Router} from "@angular/router";
import {SnackbarService} from "./snackbar.service";
import {apiUrl} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
  ) {
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  login(user: User) {
    this.http.post<boolean>(apiUrl + 'user/login', user).pipe(
      catchError(error => {
        this.snackbarService.errorMessage('Incorrect username or password');
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
    if (this.user) return this.user;

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
