import {Injectable} from '@angular/core';
import {catchError, EMPTY, Observable} from "rxjs";
import {Delivery} from "../../entitites/delivery";
import {HttpClient} from "@angular/common/http";
import {SnackbarService} from "../common/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private readonly http: HttpClient, private readonly snackbar: SnackbarService) { }

  getAllDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>('delivery').pipe(
      catchError(error => {
        this.snackbar.errorMessage(error.message);
        return EMPTY;
      })
    );
  }
}
