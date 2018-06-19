import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AppService } from './service/app.service';
import { App } from './model/app';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  showAll = true;
  locationOption = [];
  ticketInfoOptions: any[];
  initData = [];
  showData = [];
  copyData = [];
  singleData = {};
  key = '';
  keyword = '';
  @ViewChild('tKeyword') tKeyword: NgModel;

  zone = '';
  @ViewChild('tZone') tZone: NgModel;

  ticketInfo = '';
  @ViewChild('tTicketInfo') tTicketInfo: NgModel;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getData().subscribe((res: any) => {
      const records = res.result.records;
      this.initData = records;
      this.ticketInfoOptions =
        Array.from(new Set(this.initData.map(data => data.Ticketinfo))).filter(res => !!res);
      this.locationOption = Array.from(new Set(this.initData.map(data => data.Zone))).filter(resp => !!resp);
      this.initTheData();
    });
  }

  initTheData() {
    this.copyData = [...this.initData];
    this.showData = [...this.copyData];
  }

  ngAfterViewInit() {
    combineLatest(this.tZone.valueChanges,
      this.tTicketInfo.valueChanges,
      this.tKeyword.valueChanges).pipe(
        debounceTime(500)).subscribe((value: any) => {
          this.query(value);
        });
  }
  filterData(key, value) {
    if (this.copyData) {
      this.copyData = this.copyData.filter(res => {
        return res[key].match(value);
      });
    }
  }
  query(termArray: Array<string>) {
    this.initTheData();
    termArray.forEach((v, i) => {
      console.log(v, i)
      if (i === 0) {
        this.key = 'Zone';
        if (v) {
          this.filterData(this.key, v);
        }
      } else if (i === 1) {
        this.key = 'Ticketinfo';
        if (v) {
          this.filterData(this.key, v);
        }
      } else if (i === 2) {
        this.key = 'Name';
        if (v) {
          this.filterData(this.key, v);
        }
      }
      this.showData = [...this.copyData];
    });

  }
  showDetail(data) {
    this.showAll = !this.showAll;
    console.log(data);
    this.singleData = data;
  }
}
