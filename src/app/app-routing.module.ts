import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { UpdatetaskComponent } from './updatetask/updatetask.component';

const routes: Routes = [
  { path: '', component: ViewtaskComponent },
  { path: 'addtask', component: AddtaskComponent },
  { path: 'updatetask/:id', component: UpdatetaskComponent },
  { path: 'viewtask', component: ViewtaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
