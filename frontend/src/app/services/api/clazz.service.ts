import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Clazz} from "../../entitites/clazz";
import {catchError, EMPTY, Observable} from "rxjs";
import {SnackbarService} from "../common/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  constructor(
    private readonly http: HttpClient,
    private readonly snackbar: SnackbarService,
  ) { }

  getAllClasses(): Observable<Clazz[]> {
    return this.http.get<Clazz[]>('class').pipe(
      catchError(error => {
        this.snackbar.errorMessage(error.message);
        return EMPTY;
      })
    );
  }
}
