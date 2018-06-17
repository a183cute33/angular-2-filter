import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  BaseUrl = 'https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97';
  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get(this.BaseUrl);
  }
}
