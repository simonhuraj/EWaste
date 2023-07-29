import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../common/snackbar.service";
import {catchError, EMPTY, Observable} from "rxjs";
import {State} from "../../entitites/state";

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(
    private readonly http: HttpClient,
    private readonly snackbar: SnackbarService,
  ) { }

  getAllStates(): Observable<State[]> {
    return this.http.get<State[]>('state').pipe(
      catchError(error => {
        this.snackbar.errorMessage(error.message);
        return EMPTY;
      })
    );
  }
}
