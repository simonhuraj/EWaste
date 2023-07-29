import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {ManagerService} from "../api/manager.service";
import {apiUrl} from "../../../environment";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private readonly managerService: ManagerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({ headers: this.managerService.authorizationHeader, url: apiUrl + req.url })
    return next.handle(newReq);
  }

}
