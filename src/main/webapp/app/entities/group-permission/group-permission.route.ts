import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupPermission } from 'app/shared/model/group-permission.model';
import { GroupPermissionService } from './group-permission.service';
import { GroupPermissionComponent } from './group-permission.component';
import { GroupPermissionDetailComponent } from './group-permission-detail.component';
import { GroupPermissionUpdateComponent } from './group-permission-update.component';
import { IGroupPermission } from 'app/shared/model/group-permission.model';

@Injectable({ providedIn: 'root' })
export class GroupPermissionResolve implements Resolve<IGroupPermission> {
  constructor(private service: GroupPermissionService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGroupPermission> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((groupPermission: HttpResponse<GroupPermission>) => groupPermission.body));
    }
    return of(new GroupPermission());
  }
}

export const groupPermissionRoute: Routes = [
  {
    path: '',
    component: GroupPermissionComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'GroupPermissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GroupPermissionDetailComponent,
    resolve: {
      groupPermission: GroupPermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'GroupPermissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GroupPermissionUpdateComponent,
    resolve: {
      groupPermission: GroupPermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'GroupPermissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GroupPermissionUpdateComponent,
    resolve: {
      groupPermission: GroupPermissionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'GroupPermissions'
    },
    canActivate: [UserRouteAccessService]
  }
];
