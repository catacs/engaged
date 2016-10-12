import { Component } from '@angular/core';
@Component({
  selector: 'intro',
  templateUrl: './app/intro.template.html'
})
export class IntroComponent {
  title: string;
  date: Date;
  constructor() {
    this.title = "Catalin & Amparo"
    this.date = new Date(2017, 9, 7);
  }
}