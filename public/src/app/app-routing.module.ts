import { AddauthorComponent } from './addauthor/addauthor.component';
import { EditauthorComponent } from './editauthor/editauthor.component';
import { ViewauthorComponent } from './viewauthor/viewauthor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'add',component: AddauthorComponent },
  { path: 'edit/:id',component: EditauthorComponent },
  { path: 'home', component: ViewauthorComponent },

  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: '**', component: ViewauthorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
