import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environment/environment';

@Injectable()
export class HttpService {
  private headers: any;

  constructor(private httpClient: HttpClient) {
    this.headers = { headers: new HttpHeaders() };
  }

  public get(url) {
    return this.httpClient.get(`${environment.apiBaseUrl}${url}`, this.headers);
  }

  // TODO
  public post(url, payload) {}

  public put(url, payload) {}

  public delete(url) {}
}
