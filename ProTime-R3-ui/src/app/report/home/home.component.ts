import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'pt3-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  report: Report;

  signText: string;

  constructor() { }

  ngOnInit() {
    const datePipe = new DatePipe('en');
    this.signText = `Bielefeld, ${datePipe.transform(new Date(), 'dd.MM.yyyy')}`;
  }
}
