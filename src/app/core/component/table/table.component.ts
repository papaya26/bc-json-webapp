import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public data: any;
  public dataSource$: Observable<any>;
  public dataSourceColumns: string[];

  public ngOnInit() {
    if (this.dataSource$) {
      this.dataSource$ = this.dataSource$.pipe(
        mergeMap(res => {
          return of(res.data);
        })
      );
    }

    if (this.data) {
      this.dataSourceColumns = this.data.columndFields.map(cf => cf.columnName);
    }
  }
}
