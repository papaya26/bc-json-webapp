import { ComponentFactoryResolver, Injectable } from '@angular/core';

import { CardComponent } from '../component/card/card.component';
import { PlainComponent } from '../component/plain/plain.component';
import { TableComponent } from '../component/table/table.component';

@Injectable()
export class ComponentService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  public contructComponent(type?: string): any {
    switch (type) {
      case 'table':
        return this.componentFactoryResolver.resolveComponentFactory(
          TableComponent
        );
      case 'card':
        return this.componentFactoryResolver.resolveComponentFactory(
          CardComponent
        );
      default:
        return this.componentFactoryResolver.resolveComponentFactory(
          PlainComponent
        );
    }
  }
}
