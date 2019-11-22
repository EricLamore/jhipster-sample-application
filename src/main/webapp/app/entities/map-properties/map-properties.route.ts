import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MapProperties } from 'app/shared/model/map-properties.model';
import { MapPropertiesService } from './map-properties.service';
import { MapPropertiesComponent } from './map-properties.component';
import { MapPropertiesDetailComponent } from './map-properties-detail.component';
import { MapPropertiesUpdateComponent } from './map-properties-update.component';
import { IMapProperties } from 'app/shared/model/map-properties.model';

@Injectable({ providedIn: 'root' })
export class MapPropertiesResolve implements Resolve<IMapProperties> {
  constructor(private service: MapPropertiesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMapProperties> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(map((mapProperties: HttpResponse<MapProperties>) => mapProperties.body));
    }
    return of(new MapProperties());
  }
}

export const mapPropertiesRoute: Routes = [
  {
    path: '',
    component: MapPropertiesComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'MapProperties'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MapPropertiesDetailComponent,
    resolve: {
      mapProperties: MapPropertiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MapProperties'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MapPropertiesUpdateComponent,
    resolve: {
      mapProperties: MapPropertiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MapProperties'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MapPropertiesUpdateComponent,
    resolve: {
      mapProperties: MapPropertiesResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'MapProperties'
    },
    canActivate: [UserRouteAccessService]
  }
];
