import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorRequest } from 'app/shared/model/error-request.model';
import { ErrorRequestService } from './error-request.service';
import { ErrorRequestComponent } from './error-request.component';
import { ErrorRequestDetailComponent } from './error-request-detail.component';
import { ErrorRequestUpdateComponent } from './error-request-update.component';
import { IErrorRequest } from 'app/shared/model/error-request.model';

@Injectable({ providedIn: 'root' })
export class ErrorRequestResolve implements Resolve<IErrorRequest> {
  constructor(private service: ErrorRequestService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IErrorRequest> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((errorRequest: HttpResponse<ErrorRequest>) => errorRequest.body));
    }
    return of(new ErrorRequest());
  }
}

export const errorRequestRoute: Routes = [
  {
    path: '',
    component: ErrorRequestComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'ErrorRequests'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ErrorRequestDetailComponent,
    resolve: {
      errorRequest: ErrorRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ErrorRequests'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ErrorRequestUpdateComponent,
    resolve: {
      errorRequest: ErrorRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ErrorRequests'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ErrorRequestUpdateComponent,
    resolve: {
      errorRequest: ErrorRequestResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ErrorRequests'
    },
    canActivate: [UserRouteAccessService]
  }
];
