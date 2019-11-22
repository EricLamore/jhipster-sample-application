import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHeaderConfiguration } from 'app/shared/model/header-configuration.model';
import { HeaderConfigurationService } from './header-configuration.service';

@Component({
  templateUrl: './header-configuration-delete-dialog.component.html'
})
export class HeaderConfigurationDeleteDialogComponent {
  headerConfiguration: IHeaderConfiguration;

  constructor(
    protected headerConfigurationService: HeaderConfigurationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.headerConfigurationService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'headerConfigurationListModification',
        content: 'Deleted an headerConfiguration'
      });
      this.activeModal.dismiss(true);
    });
  }
}
