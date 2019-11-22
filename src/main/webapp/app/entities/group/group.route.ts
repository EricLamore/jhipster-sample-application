import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from 'app/shared/model/group.model';
import { GroupService } from './group.service';
import { GroupComponent } from './group.component';
import { GroupDetailComponent } from './group-detail.component';
import { GroupUpdateComponent } from './group-update.component';
import { IGroup } from 'app/shared/model/group.model';

@Injectable({ providedIn: 'root' })
export class GroupResolve implements Resolve<IGroup> {
  constructor(private service: GroupService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGroup> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((group: HttpResponse<Group>) => group.body));
    }
    return of(new Group());
  }
}

export const groupRoute: Routes = [
  {
    path: '',
    component: GroupComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Groups'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GroupDetailComponent,
    resolve: {
      group: GroupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Groups'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GroupUpdateComponent,
    resolve: {
      group: GroupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Groups'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GroupUpdateComponent,
    resolve: {
      group: GroupResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Groups'
    },
    canActivate: [UserRouteAccessService]
  }
];
