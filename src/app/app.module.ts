import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LightboxModule } from 'ngx-lightbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    LightboxModule,
    InfiniteScrollModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
