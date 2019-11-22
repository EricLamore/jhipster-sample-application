import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IErrorRequest } from 'app/shared/model/error-request.model';
import { ErrorRequestService } from './error-request.service';

@Component({
  templateUrl: './error-request-delete-dialog.component.html'
})
export class ErrorRequestDeleteDialogComponent {
  errorRequest: IErrorRequest;

  constructor(
    protected errorRequestService: ErrorRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.errorRequestService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'errorRequestListModification',
        content: 'Deleted an errorRequest'
      });
      this.activeModal.dismiss(true);
    });
  }
}
