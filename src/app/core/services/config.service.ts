import { Injectable } from '@angular/core';

import { environment } from '@environment/environment';

import { HttpService } from './http.service';

@Injectable()
export class ConfigService {
  private pages$: any;
  private getPages: Promise<any>;
  private isConfigRetrieved = false;

  constructor(private httpService: HttpService) {}

  public loadConfig(): Promise<any> {
    this.pages$ = null;

    if (this.isConfigRetrieved) {
      return Promise.resolve();
    }

    if (this.getPages != null) {
      return this.getPages;
    }

    this.getPages = this.httpService
      .get(environment.api.getpages)
      .toPromise()
      .then(data => {
        this.pages$ = data;
        this.isConfigRetrieved = true;
        return data;
      })
      .catch(err => {
        this.isConfigRetrieved = true;
        return [];
      });
    return this.getPages;
  }

  public get pages(): any {
    return this.pages$;
  }
}
