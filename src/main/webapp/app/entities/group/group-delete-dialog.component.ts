import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGroup } from 'app/shared/model/group.model';
import { GroupService } from './group.service';

@Component({
  templateUrl: './group-delete-dialog.component.html'
})
export class GroupDeleteDialogComponent {
  group: IGroup;

  constructor(protected groupService: GroupService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.groupService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'groupListModification',
        content: 'Deleted an group'
      });
      this.activeModal.dismiss(true);
    });
  }
}
