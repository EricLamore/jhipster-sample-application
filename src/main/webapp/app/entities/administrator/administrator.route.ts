import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Administrator } from 'app/shared/model/administrator.model';
import { AdministratorService } from './administrator.service';
import { AdministratorComponent } from './administrator.component';
import { AdministratorDetailComponent } from './administrator-detail.component';
import { AdministratorUpdateComponent } from './administrator-update.component';
import { IAdministrator } from 'app/shared/model/administrator.model';

@Injectable({ providedIn: 'root' })
export class AdministratorResolve implements Resolve<IAdministrator> {
  constructor(private service: AdministratorService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdministrator> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((administrator: HttpResponse<Administrator>) => administrator.body));
    }
    return of(new Administrator());
  }
}

export const administratorRoute: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Administrators'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AdministratorDetailComponent,
    resolve: {
      administrator: AdministratorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Administrators'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AdministratorUpdateComponent,
    resolve: {
      administrator: AdministratorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Administrators'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AdministratorUpdateComponent,
    resolve: {
      administrator: AdministratorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Administrators'
    },
    canActivate: [UserRouteAccessService]
  }
];
