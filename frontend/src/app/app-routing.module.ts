import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {authenticationGuardFunction} from "./guards/guards";
import {HomeComponent} from "./components/home/home.component";
import {WasteListComponent} from "./pages/waste/waste-list/waste-list.component";
import {RegisterComponent} from "./pages/waste/register/register.component";


const routes: Routes  = [
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: HomeComponent,
    canActivate: [authenticationGuardFunction()],
    children: [
      { path: '', component: WasteListComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: '**', redirectTo: 'not-found'},
    ]
  },
  { path: '**', redirectTo: ''},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
