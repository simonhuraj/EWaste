import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from "./app.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes  = [
  { path: ''},
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'not-found'},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
