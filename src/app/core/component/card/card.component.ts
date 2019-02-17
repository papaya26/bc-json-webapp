import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  public data: any;
  public dataSource$: Observable<any>;

  public ngOnInit() {
    if (this.dataSource$) {
      this.dataSource$ = this.dataSource$.pipe(
        mergeMap(res => {
          return of(res.data);
        })
      );
    }
  }
}
