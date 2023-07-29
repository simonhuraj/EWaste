import {CanActivateFn, Router} from "@angular/router";
import {ManagerService} from "../services/api/manager.service";
import {inject} from "@angular/core";

export function authenticationGuardFunction(): CanActivateFn {
  return (route) => {
    const userService: ManagerService = inject(ManagerService);
    const router: Router = inject(Router);

    if (userService.isLoggedIn()) return true;

    userService.redirectUrl = route.url.toString();
    console.log(route.url.toString());
    router.navigateByUrl("/login");
    return false;
  }
}
