import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public menu: string[];

  constructor(private configService: ConfigService) {
    this.menu = [];
  }

  public ngOnInit() {
    this.menu = this.configService.pages.map(page => {
      const { data } = page;
      return data.name === 'mainview' ? 'home' : data.name;
    });
  }
}
