import {Injectable} from '@angular/core';
import {User} from "../entitites/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, EMPTY} from "rxjs";
import {Router} from "@angular/router";
import {SnackbarService} from "./snackbar.service";
import {apiUrl} from "../../environment";

const DEFAULT_REDIRECT = 'list';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  public redirectUrl = DEFAULT_REDIRECT;
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
      this.storeToken(user)
      this.user = user;
      this.router.navigateByUrl(this.redirectUrl);
    });
  }

  logout(): void {
    this.removeToken();
    this.redirectUrl = DEFAULT_REDIRECT;
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

    let token = localStorage.getItem('token');

    if (!token) return undefined;

    token = atob(token);
    const username = token.slice(0, token.indexOf(':'));
    const password = token.slice(token.indexOf(':'));

    return new User(username, password);
  }

  private storeToken(user: User): void {
    const token = btoa(`${user.username}:${user.password}`);
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }
}
