import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ImageItemComponent } from './image-item/image-item.component';
import { IgImagePipe } from './pipes/ig-image.pipe';
import { ShortNumPipe } from './pipes/short-num.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProfileHeaderComponent,
    ImageItemComponent,
    IgImagePipe,
    ShortNumPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
