import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReportService } from 'src/app/base/services/report.service';
import { Report } from 'src/app/ProTime-R3-backend';
import { formatDate } from '@angular/common';
import { saveAs } from 'file-saver';

@Component({
  selector: 'pt3-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss']
})
export class FilterFormComponent implements OnInit {
  form: FormGroup;

  @Output()
  reportLoaded = new EventEmitter<Report>();

  constructor(private builder: FormBuilder, private reportService: ReportService) {
    let initValues = {} as Report;
    if (!reportService.currentReport) {
      //init defaults
      let now = new Date();
      now.setDate(1);
      initValues.from = now;

      now = new Date();
      now.setMonth(now.getMonth() + 1);
      initValues.to = now;
    } else {
      initValues = reportService.currentReport;
    }

    this.form = builder.group({
      from: [''],
      to: [''],
      project: [''],
      filter: [''],
      includeDrive: [false]
    });

    this.form.patchValue(initValues);

    this.getReport();
  }

  ngOnInit() {}

  getReport() {
    const report = this.form.value;
    const project = report.project;
    this.reportService
      .getReport(report.from, report.to, project, report.filter, report.includeDrive)
      .subscribe(r => this.reportLoaded.emit(r));
  }

  exportReport() {
    const report = this.form.value;
    const project = report.project;
    this.reportService
      .exportReport(report.from, report.to, project, report.filter, report.includeDrive)
      .subscribe(r => {
        saveAs(r, `protime-r3_export_${report.from}_${report.to}.csv`);
      });
  }
}
