import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOperator } from 'app/shared/model/operator.model';
import { OperatorService } from './operator.service';

@Component({
  templateUrl: './operator-delete-dialog.component.html'
})
export class OperatorDeleteDialogComponent {
  operator: IOperator;

  constructor(protected operatorService: OperatorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.operatorService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'operatorListModification',
        content: 'Deleted an operator'
      });
      this.activeModal.dismiss(true);
    });
  }
}
