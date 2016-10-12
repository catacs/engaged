import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IntroComponent }   from './intro.component';
import { LOCALE_ID } from '@angular/core';
@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ IntroComponent ],
  bootstrap:    [ IntroComponent ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-ES" }, //replace "en-US" with your locale
  ]
})
export class AppModule { }
