import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Link } from 'app/shared/model/link.model';
import { LinkService } from './link.service';
import { LinkComponent } from './link.component';
import { LinkDetailComponent } from './link-detail.component';
import { LinkUpdateComponent } from './link-update.component';
import { ILink } from 'app/shared/model/link.model';

@Injectable({ providedIn: 'root' })
export class LinkResolve implements Resolve<ILink> {
  constructor(private service: LinkService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILink> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((link: HttpResponse<Link>) => link.body));
    }
    return of(new Link());
  }
}

export const linkRoute: Routes = [
  {
    path: '',
    component: LinkComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Links'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: LinkDetailComponent,
    resolve: {
      link: LinkResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Links'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: LinkUpdateComponent,
    resolve: {
      link: LinkResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Links'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: LinkUpdateComponent,
    resolve: {
      link: LinkResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Links'
    },
    canActivate: [UserRouteAccessService]
  }
];
