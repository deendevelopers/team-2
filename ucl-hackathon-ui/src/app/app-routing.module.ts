import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from "./landing.component";
import {SearchComponent} from "./search.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
