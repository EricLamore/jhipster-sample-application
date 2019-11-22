import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { AdministratorComponent } from './administrator.component';
import { AdministratorDetailComponent } from './administrator-detail.component';
import { AdministratorUpdateComponent } from './administrator-update.component';
import { AdministratorDeleteDialogComponent } from './administrator-delete-dialog.component';
import { administratorRoute } from './administrator.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(administratorRoute)],
  declarations: [AdministratorComponent, AdministratorDetailComponent, AdministratorUpdateComponent, AdministratorDeleteDialogComponent],
  entryComponents: [AdministratorDeleteDialogComponent]
})
export class JhipsterSampleApplicationAdministratorModule {}
