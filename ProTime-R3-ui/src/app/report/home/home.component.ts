import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/api';

@Component({
  selector: 'pt3-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  report: Report;

  constructor() { }

  ngOnInit() { }
}
