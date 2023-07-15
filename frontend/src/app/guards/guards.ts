import {CanActivateFn, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {inject} from "@angular/core";

export function authenticationGuardFunction(): CanActivateFn {
  return (route) => {
    const userService: UserService = inject(UserService);
    const router: Router = inject(Router);

    if (userService.isLoggedIn()) return true;

    userService.redirectUrl = route.url.toString();
    console.log(route.url.toString());
    router.navigateByUrl("/login");
    return false;
  }
}
