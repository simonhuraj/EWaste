import {Injectable} from '@angular/core';
import {Manager} from "../entitites/manager";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, EMPTY} from "rxjs";
import {Router} from "@angular/router";
import {SnackbarService} from "./snackbar.service";
import {apiUrl} from "../../environment";

const DEFAULT_REDIRECT = 'list';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  public redirectUrl = DEFAULT_REDIRECT;
  private manager: Manager | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
  ) {
  }

  isLoggedIn(): boolean {
    return !!this.getManager();
  }

  login(manager: Manager) {
    this.http.post<boolean>(apiUrl + 'manager/login', manager).pipe(
      catchError(error => {
        this.snackbarService.errorMessage('Incorrect username or password');
        return EMPTY;
      })
    ).subscribe(value => {
      this.storeToken(manager)
      this.manager = manager;
      this.router.navigateByUrl(this.redirectUrl);
    });
  }

  logout(): void {
    this.removeToken();
    this.redirectUrl = DEFAULT_REDIRECT;
    this.router.navigateByUrl('/login');
  }

  get authorizationHeader() {
    if (!this.manager) return {};
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${this.manager.username}:${this.manager.password}`)
      })
    };
  }

  private getManager(): Manager | undefined {
    if (this.manager) return this.manager;

    let token = localStorage.getItem('token');

    if (!token) return undefined;

    token = atob(token);
    const username = token.slice(0, token.indexOf(':'));
    const password = token.slice(token.indexOf(':'));

    return new Manager(username, password);
  }

  private storeToken(manager: Manager): void {
    const token = btoa(`${manager.username}:${manager.password}`);
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }
}
