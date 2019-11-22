import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdministrator } from 'app/shared/model/administrator.model';
import { AdministratorService } from './administrator.service';

@Component({
  templateUrl: './administrator-delete-dialog.component.html'
})
export class AdministratorDeleteDialogComponent {
  administrator: IAdministrator;

  constructor(
    protected administratorService: AdministratorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.administratorService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'administratorListModification',
        content: 'Deleted an administrator'
      });
      this.activeModal.dismiss(true);
    });
  }
}
