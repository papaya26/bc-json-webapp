import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { ComponentService } from '@app/core/services/component.service';
import { HttpService } from '@app/core/services/http.service';
import { environment } from '@environment/environment.prod';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContainerComponent implements OnInit {
  @ViewChild('pcContainer', { read: ViewContainerRef })
  public pcContainerRef: ViewContainerRef;
  public data: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private componentService: ComponentService,
    private httpService: HttpService
  ) {}

  public ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe(page => {
      console.log('active rotue subs', page);
      this.loadComponent(page);
    });
  }

  private loadComponent(page?: any) {
    this.pcContainerRef.clear();
    let componentRef = null;
    if (page.data) {
      console.log('load comp', page);
      switch (page.data.type) {
        case 'table':
        case 'card':
          componentRef = this.constructComponentRef(page.data.type);
          (componentRef.instance as any).data = page.data;
          (componentRef.instance as any).dataSource$ = this.httpService.get(
            `${environment.api.getData}/${page.file}`
          );
          break;
        default:
          componentRef = this.constructComponentRef();
          (componentRef.instance as any).data = page.data.content || '';
          break;
      }
    }
  }

  private constructComponentRef(type?: any) {
    const component = this.componentService.contructComponent(type);
    return this.pcContainerRef.createComponent(component);
  }
}
