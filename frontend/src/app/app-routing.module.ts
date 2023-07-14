import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {authenticationGuardFunction} from "./guards/guards";


const routes: Routes  = [
  { path: 'login', component: LoginComponent},
  { path: 'not-found', component: NotFoundComponent, canActivate: [authenticationGuardFunction()] },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: 'not-found'},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
