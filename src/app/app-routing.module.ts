import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './components/gallery/gallery.component';

const routes: Routes = [

  {path: '', redirectTo: '/gallery', pathMatch: "full"},

  {path: 'gallery', component:GalleryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
