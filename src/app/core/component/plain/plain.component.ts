import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-plain',
  templateUrl: './plain.component.html',
  styleUrls: ['./plain.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlainComponent {
  public data: any;
}
