import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IGroupConfiguration, GroupConfiguration } from 'app/shared/model/group-configuration.model';
import { GroupConfigurationService } from './group-configuration.service';
import { IHeaderConfiguration } from 'app/shared/model/header-configuration.model';
import { HeaderConfigurationService } from 'app/entities/header-configuration/header-configuration.service';
import { IMapProperties } from 'app/shared/model/map-properties.model';
import { MapPropertiesService } from 'app/entities/map-properties/map-properties.service';

@Component({
  selector: 'jhi-group-configuration-update',
  templateUrl: './group-configuration-update.component.html'
})
export class GroupConfigurationUpdateComponent implements OnInit {
  isSaving: boolean;

  headers: IHeaderConfiguration[];

  i18ns: IMapProperties[];

  metadatas: IMapProperties[];

  editForm = this.fb.group({
    id: [],
    header: [],
    i18n: [],
    metaDatas: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected groupConfigurationService: GroupConfigurationService,
    protected headerConfigurationService: HeaderConfigurationService,
    protected mapPropertiesService: MapPropertiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ groupConfiguration }) => {
      this.updateForm(groupConfiguration);
    });
    this.headerConfigurationService.query({ filter: 'groupconfiguration-is-null' }).subscribe(
      (res: HttpResponse<IHeaderConfiguration[]>) => {
        if (!this.editForm.get('header').value || !this.editForm.get('header').value.id) {
          this.headers = res.body;
        } else {
          this.headerConfigurationService
            .find(this.editForm.get('header').value.id)
            .subscribe(
              (subRes: HttpResponse<IHeaderConfiguration>) => (this.headers = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.mapPropertiesService.query({ filter: 'groupconfiguration-is-null' }).subscribe(
      (res: HttpResponse<IMapProperties[]>) => {
        if (!this.editForm.get('i18n').value || !this.editForm.get('i18n').value.id) {
          this.i18ns = res.body;
        } else {
          this.mapPropertiesService
            .find(this.editForm.get('i18n').value.id)
            .subscribe(
              (subRes: HttpResponse<IMapProperties>) => (this.i18ns = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.mapPropertiesService.query({ filter: 'groupconfiguration-is-null' }).subscribe(
      (res: HttpResponse<IMapProperties[]>) => {
        if (!this.editForm.get('metaDatas').value || !this.editForm.get('metaDatas').value.id) {
          this.metadatas = res.body;
        } else {
          this.mapPropertiesService
            .find(this.editForm.get('metaDatas').value.id)
            .subscribe(
              (subRes: HttpResponse<IMapProperties>) => (this.metadatas = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(groupConfiguration: IGroupConfiguration) {
    this.editForm.patchValue({
      id: groupConfiguration.id,
      header: groupConfiguration.header,
      i18n: groupConfiguration.i18n,
      metaDatas: groupConfiguration.metaDatas
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const groupConfiguration = this.createFromForm();
    if (groupConfiguration.id !== undefined) {
      this.subscribeToSaveResponse(this.groupConfigurationService.update(groupConfiguration));
    } else {
      this.subscribeToSaveResponse(this.groupConfigurationService.create(groupConfiguration));
    }
  }

  private createFromForm(): IGroupConfiguration {
    return {
      ...new GroupConfiguration(),
      id: this.editForm.get(['id']).value,
      header: this.editForm.get(['header']).value,
      i18n: this.editForm.get(['i18n']).value,
      metaDatas: this.editForm.get(['metaDatas']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupConfiguration>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackHeaderConfigurationById(index: number, item: IHeaderConfiguration) {
    return item.id;
  }

  trackMapPropertiesById(index: number, item: IMapProperties) {
    return item.id;
  }
}
