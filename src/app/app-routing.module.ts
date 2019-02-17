import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';

import { ConfigService } from './core/services/config.service';

import { PageContainerComponent } from './core/component/page-container/page-container.component';

@NgModule({
  imports: [RouterModule.forRoot([])],
  exports: [RouterModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [Injector, ConfigService],
      multi: true
    }
  ]
})
export class AppRoutingModule {}

export function configServiceFactory(
  injector: Injector,
  configService: ConfigService
) {
  return () => {
    return configService.loadConfig().then(config => {
      if (config) {
        const router: Router = injector.get(Router);
        let appRoutes: Routes = [
          { path: 'home', component: PageContainerComponent }
        ];

        if (config && config.length) {
          appRoutes = config.map(c => {
            const { data } = c;
            return {
              path: data.name === 'mainview' ? 'home' : data.name,
              component: PageContainerComponent,
              data: c
            };
          });
        }
        // should route to 404 not found page
        appRoutes.push({ path: '**', redirectTo: 'home' });
        console.log(appRoutes);
        router.resetConfig(appRoutes);
      }
    });
  };
}
