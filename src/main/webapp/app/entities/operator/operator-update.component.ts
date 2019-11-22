import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IOperator, Operator } from 'app/shared/model/operator.model';
import { OperatorService } from './operator.service';
import { IMapProperties } from 'app/shared/model/map-properties.model';
import { MapPropertiesService } from 'app/entities/map-properties/map-properties.service';

@Component({
  selector: 'jhi-operator-update',
  templateUrl: './operator-update.component.html'
})
export class OperatorUpdateComponent implements OnInit {
  isSaving: boolean;

  metadatas: IMapProperties[];
  invitationDateDp: any;
  accessDateDp: any;
  trainingDateDp: any;
  mcqDateDp: any;

  editForm = this.fb.group({
    id: [],
    status: [null, [Validators.required]],
    phoneNumber: [],
    invitationDate: [],
    invitationUrl: [],
    updateAccessDate: [],
    accessDate: [],
    updateTrainingDate: [],
    trainingDate: [],
    hasSucceededMCQ: [],
    updateQCMDate: [],
    mcqDate: [],
    trainingSessionId: [],
    trainingSessionURL: [],
    sessionId: [],
    groupId: [],
    metaDatas: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected operatorService: OperatorService,
    protected mapPropertiesService: MapPropertiesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ operator }) => {
      this.updateForm(operator);
    });
    this.mapPropertiesService.query({ filter: 'operator-is-null' }).subscribe(
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

  updateForm(operator: IOperator) {
    this.editForm.patchValue({
      id: operator.id,
      status: operator.status,
      phoneNumber: operator.phoneNumber,
      invitationDate: operator.invitationDate,
      invitationUrl: operator.invitationUrl,
      updateAccessDate: operator.updateAccessDate,
      accessDate: operator.accessDate,
      updateTrainingDate: operator.updateTrainingDate,
      trainingDate: operator.trainingDate,
      hasSucceededMCQ: operator.hasSucceededMCQ,
      updateQCMDate: operator.updateQCMDate,
      mcqDate: operator.mcqDate,
      trainingSessionId: operator.trainingSessionId,
      trainingSessionURL: operator.trainingSessionURL,
      sessionId: operator.sessionId,
      groupId: operator.groupId,
      metaDatas: operator.metaDatas
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const operator = this.createFromForm();
    if (operator.id !== undefined) {
      this.subscribeToSaveResponse(this.operatorService.update(operator));
    } else {
      this.subscribeToSaveResponse(this.operatorService.create(operator));
    }
  }

  private createFromForm(): IOperator {
    return {
      ...new Operator(),
      id: this.editForm.get(['id']).value,
      status: this.editForm.get(['status']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      invitationDate: this.editForm.get(['invitationDate']).value,
      invitationUrl: this.editForm.get(['invitationUrl']).value,
      updateAccessDate: this.editForm.get(['updateAccessDate']).value,
      accessDate: this.editForm.get(['accessDate']).value,
      updateTrainingDate: this.editForm.get(['updateTrainingDate']).value,
      trainingDate: this.editForm.get(['trainingDate']).value,
      hasSucceededMCQ: this.editForm.get(['hasSucceededMCQ']).value,
      updateQCMDate: this.editForm.get(['updateQCMDate']).value,
      mcqDate: this.editForm.get(['mcqDate']).value,
      trainingSessionId: this.editForm.get(['trainingSessionId']).value,
      trainingSessionURL: this.editForm.get(['trainingSessionURL']).value,
      sessionId: this.editForm.get(['sessionId']).value,
      groupId: this.editForm.get(['groupId']).value,
      metaDatas: this.editForm.get(['metaDatas']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOperator>>) {
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

  trackMapPropertiesById(index: number, item: IMapProperties) {
    return item.id;
  }
}
