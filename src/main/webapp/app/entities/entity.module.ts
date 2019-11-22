import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'administrator',
        loadChildren: () => import('./administrator/administrator.module').then(m => m.JhipsterSampleApplicationAdministratorModule)
      },
      {
        path: 'certified-user',
        loadChildren: () => import('./certified-user/certified-user.module').then(m => m.JhipsterSampleApplicationCertifiedUserModule)
      },
      {
        path: 'error-request',
        loadChildren: () => import('./error-request/error-request.module').then(m => m.JhipsterSampleApplicationErrorRequestModule)
      },
      {
        path: 'group',
        loadChildren: () => import('./group/group.module').then(m => m.JhipsterSampleApplicationGroupModule)
      },
      {
        path: 'link',
        loadChildren: () => import('./link/link.module').then(m => m.JhipsterSampleApplicationLinkModule)
      },
      {
        path: 'group-configuration',
        loadChildren: () =>
          import('./group-configuration/group-configuration.module').then(m => m.JhipsterSampleApplicationGroupConfigurationModule)
      },
      {
        path: 'group-permission',
        loadChildren: () => import('./group-permission/group-permission.module').then(m => m.JhipsterSampleApplicationGroupPermissionModule)
      },
      {
        path: 'header-configuration',
        loadChildren: () =>
          import('./header-configuration/header-configuration.module').then(m => m.JhipsterSampleApplicationHeaderConfigurationModule)
      },
      {
        path: 'map-properties',
        loadChildren: () => import('./map-properties/map-properties.module').then(m => m.JhipsterSampleApplicationMapPropertiesModule)
      },
      {
        path: 'operator',
        loadChildren: () => import('./operator/operator.module').then(m => m.JhipsterSampleApplicationOperatorModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplicationEntityModule {}
