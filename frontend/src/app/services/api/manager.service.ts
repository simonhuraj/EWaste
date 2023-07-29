import {Injectable} from '@angular/core';
import {Manager} from "../../entitites/manager";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, EMPTY} from "rxjs";
import {Router} from "@angular/router";
import {SnackbarService} from "../common/snackbar.service";

const DEFAULT_REDIRECT = '/list';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  redirectUrl = DEFAULT_REDIRECT;
  private token: string | undefined;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService,
  ) {
  }

  isLoggedIn(): boolean {
    return !!this.getToken;
  }

  login(manager: Manager) {
    this.http.post<boolean>('manager/login', manager).pipe(
      catchError(error => {
        this.snackbarService.errorMessage('Incorrect username or password');
        return EMPTY;
      })
    ).subscribe(value => {
      this.storeToken(this.createToken(manager));
      this.router.navigateByUrl(this.redirectUrl);
    });
  }

  logout(): void {
    this.removeToken();
    this.redirectUrl = DEFAULT_REDIRECT;
    this.router.navigateByUrl('/login');
  }

  get authorizationHeader(): HttpHeaders {
    if (!this.getToken) return new HttpHeaders();
    return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${this.getToken}`
      });
  }

  get getToken() {
    return this.token ?? localStorage.getItem('token');
  }

  private storeToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
  }

  private createToken(manager: Manager): string {
    return btoa(`${manager.username}:${manager.password}`);
  }
}
