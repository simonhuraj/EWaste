import {Injectable} from '@angular/core';
import {ManagerService} from "./manager.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly managerService: ManagerService, private readonly http: HttpClient) { }

}
