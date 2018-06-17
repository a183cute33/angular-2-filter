import { Component, OnInit } from '@angular/core';
import { AppService } from './service/app.service';
import { App } from './model/app';
import { Api } from './model/api';

import { ajax } from 'rxjs/ajax';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  showAll = true;
  pay: Boolean = false;
  open: Boolean = false;

  searchTag = ['All'];
  locationOption = ['All'];
  selectedLocation = 'All';
  oldSelectedLocation = 'All';
  datas: App[] = [];
  showDatas = [];
  count = 0;
  pageCount = 0;

  constructor(private appService: AppService) { }

  ngOnInit() {
    const apiData = ajax('https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97');
    apiData.subscribe(res => console.log(res.status, res.response));
    this.appService.getData()
      .subscribe((res: Api) => {
        const records = res.result.records;
        this.count = records.length;
        // this.pageCount = records.length / 10;
        records.map((m) => {
          if (this.locationOption.indexOf(m.Zone) < 0) {
            this.locationOption.push(m.Zone);
          }
          this.datas.push(m);
        });
        this.showDatas = this.datas.slice();
      });
  }
  changeSelect(event: Event) {
    this.deleteSearchFormIndexOf(this.oldSelectedLocation);
    this.allTagFilter();
    this.addSearchTag(this.selectedLocation);
    this.oldSelectedLocation = this.selectedLocation;
  }

  deleteSearchTag(i) {
    this.searchTag.splice(i, 1);
    this.allTagFilter();
  }

  deleteSearchFormIndexOf(arr) {
    const index = this.searchTag.indexOf(arr);
    if (index > -1) {
      this.searchTag.splice(index, 1);
    }
    console.log(this.searchTag);
  }

  addSearchTag(data) {
    const locationDiff = this.searchTag.indexOf(data);
    if (locationDiff === -1 && data) {
      this.searchTag.push(data);
    }
  }

  onSearchEnter(data) {
    this.addSearchTag(data);
    if (data) {
      this.showDatas = this.datas.filter(f => f.Name === data);
    } else {
      this.allTagFilter();
    }
  }

  //判斷search 是否為空，為空則顯示全部資料
  onSpace(data) {
    if (data === '') {
      this.allTagFilter();
    }
  }

  toggleEditable(event: Event, str: string) {
    alert(event.target.checked)
    if (!event.target.checked) {
      this.deleteSearchFormIndexOf(str);
    } else {
      this.addSearchTag(str);
    }
    this.allTagFilter();
  }

  allTagFilter() {
    if (this.selectedLocation !== 'All') {
      this.showDatas = this.datas.filter(f => f.Zone === this.selectedLocation);
    } else {
      this.showDatas = this.datas.slice();
    }
    if (this.pay) {
      this.showDatas = this.showDatas.filter(f => f.Ticketinfo === '免費參觀');
    }
    if (this.open) {
      this.showDatas = this.showDatas.filter(f => f.Opentime === '全天候開放');
    }
  }
}
