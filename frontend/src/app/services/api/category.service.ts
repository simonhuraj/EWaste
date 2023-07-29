import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../common/snackbar.service";
import {catchError, EMPTY, Observable} from "rxjs";
import {Category} from "../../entitites/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private readonly http: HttpClient,
    private readonly snackbar: SnackbarService,
  ) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('category').pipe(
      catchError(error => {
        this.snackbar.errorMessage(error.message);
        return EMPTY;
      })
    );
  }

}
