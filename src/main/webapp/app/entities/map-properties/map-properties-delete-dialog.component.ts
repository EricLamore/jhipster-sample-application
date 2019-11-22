import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMapProperties } from 'app/shared/model/map-properties.model';
import { MapPropertiesService } from './map-properties.service';

@Component({
  templateUrl: './map-properties-delete-dialog.component.html'
})
export class MapPropertiesDeleteDialogComponent {
  mapProperties: IMapProperties;

  constructor(
    protected mapPropertiesService: MapPropertiesService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: string) {
    this.mapPropertiesService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'mapPropertiesListModification',
        content: 'Deleted an mapProperties'
      });
      this.activeModal.dismiss(true);
    });
  }
}
