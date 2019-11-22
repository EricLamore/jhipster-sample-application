import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroupConfiguration } from 'app/shared/model/group-configuration.model';
import { GroupConfigurationService } from './group-configuration.service';

@Component({
  templateUrl: './group-configuration-delete-dialog.component.html'
})
export class GroupConfigurationDeleteDialogComponent {
  groupConfiguration: IGroupConfiguration;

  constructor(
    protected groupConfigurationService: GroupConfigurationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.groupConfigurationService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'groupConfigurationListModification',
        content: 'Deleted an groupConfiguration'
      });
      this.activeModal.dismiss(true);
    });
  }
}
