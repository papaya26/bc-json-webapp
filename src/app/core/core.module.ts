import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from './angular-material.module';

import { ComponentService } from './services/component.service';
import { ConfigService } from './services/config.service';
import { HttpService } from './services/http.service';

import { CardComponent } from './component/card/card.component';
import { MenuComponent } from './component/menu/menu.component';
import { PageContainerComponent } from './component/page-container/page-container.component';
import { PlainComponent } from './component/plain/plain.component';
import { TableComponent } from './component/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    AngularMaterialModule
  ],
  providers: [ComponentService, ConfigService, HttpService],
  declarations: [
    MenuComponent,
    CardComponent,
    PageContainerComponent,
    PlainComponent,
    TableComponent
  ],
  entryComponents: [
    CardComponent,
    PageContainerComponent,
    PlainComponent,
    TableComponent
  ],
  exports: [MenuComponent]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'Core Module is already imported. Import it only in App Module'
      );
    }
  }
}
