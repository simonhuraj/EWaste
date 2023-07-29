import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../common/snackbar.service";
import {catchError, EMPTY, Observable} from "rxjs";
import {Person} from "../../entitites/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(
    private readonly http: HttpClient,
    private readonly snackbar: SnackbarService,
  ) { }

  getAllPeople(): Observable<Person[]> {
    return this.http.get<Person[]>('person').pipe(
      catchError(error => {
        this.snackbar.errorMessage(error.message);
        return EMPTY;
      })
    );
  }
}
