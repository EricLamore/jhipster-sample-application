import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IGroup, Group } from 'app/shared/model/group.model';
import { GroupService } from './group.service';
import { IGroupConfiguration } from 'app/shared/model/group-configuration.model';
import { GroupConfigurationService } from 'app/entities/group-configuration/group-configuration.service';
import { IGroupPermission } from 'app/shared/model/group-permission.model';
import { GroupPermissionService } from 'app/entities/group-permission/group-permission.service';

@Component({
  selector: 'jhi-group-update',
  templateUrl: './group-update.component.html'
})
export class GroupUpdateComponent implements OnInit {
  isSaving: boolean;

  groupconfigurations: IGroupConfiguration[];

  parents: IGroup[];

  permissions: IGroupPermission[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    universignOrganizationId: [],
    status: [],
    activateAdvanced: [],
    universignOrganizationProfil: [],
    groupConfiguration: [],
    parent: [],
    permissions: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected groupService: GroupService,
    protected groupConfigurationService: GroupConfigurationService,
    protected groupPermissionService: GroupPermissionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ group }) => {
      this.updateForm(group);
    });
    this.groupConfigurationService.query({ filter: 'group-is-null' }).subscribe(
      (res: HttpResponse<IGroupConfiguration[]>) => {
        if (!this.editForm.get('groupConfiguration').value || !this.editForm.get('groupConfiguration').value.id) {
          this.groupconfigurations = res.body;
        } else {
          this.groupConfigurationService
            .find(this.editForm.get('groupConfiguration').value.id)
            .subscribe(
              (subRes: HttpResponse<IGroupConfiguration>) => (this.groupconfigurations = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.groupService.query({ filter: 'group-is-null' }).subscribe(
      (res: HttpResponse<IGroup[]>) => {
        if (!this.editForm.get('parent').value || !this.editForm.get('parent').value.id) {
          this.parents = res.body;
        } else {
          this.groupService
            .find(this.editForm.get('parent').value.id)
            .subscribe(
              (subRes: HttpResponse<IGroup>) => (this.parents = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.groupPermissionService.query({ filter: 'group-is-null' }).subscribe(
      (res: HttpResponse<IGroupPermission[]>) => {
        if (!this.editForm.get('permissions').value || !this.editForm.get('permissions').value.id) {
          this.permissions = res.body;
        } else {
          this.groupPermissionService
            .find(this.editForm.get('permissions').value.id)
            .subscribe(
              (subRes: HttpResponse<IGroupPermission>) => (this.permissions = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  updateForm(group: IGroup) {
    this.editForm.patchValue({
      id: group.id,
      name: group.name,
      universignOrganizationId: group.universignOrganizationId,
      status: group.status,
      activateAdvanced: group.activateAdvanced,
      universignOrganizationProfil: group.universignOrganizationProfil,
      groupConfiguration: group.groupConfiguration,
      parent: group.parent,
      permissions: group.permissions
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const group = this.createFromForm();
    if (group.id !== undefined) {
      this.subscribeToSaveResponse(this.groupService.update(group));
    } else {
      this.subscribeToSaveResponse(this.groupService.create(group));
    }
  }

  private createFromForm(): IGroup {
    return {
      ...new Group(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      universignOrganizationId: this.editForm.get(['universignOrganizationId']).value,
      status: this.editForm.get(['status']).value,
      activateAdvanced: this.editForm.get(['activateAdvanced']).value,
      universignOrganizationProfil: this.editForm.get(['universignOrganizationProfil']).value,
      groupConfiguration: this.editForm.get(['groupConfiguration']).value,
      parent: this.editForm.get(['parent']).value,
      permissions: this.editForm.get(['permissions']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroup>>) {
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

  trackGroupConfigurationById(index: number, item: IGroupConfiguration) {
    return item.id;
  }

  trackGroupById(index: number, item: IGroup) {
    return item.id;
  }

  trackGroupPermissionById(index: number, item: IGroupPermission) {
    return item.id;
  }
}
