import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHeaderConfiguration } from 'app/shared/model/header-configuration.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { HeaderConfigurationService } from './header-configuration.service';
import { HeaderConfigurationDeleteDialogComponent } from './header-configuration-delete-dialog.component';

@Component({
  selector: 'jhi-header-configuration',
  templateUrl: './header-configuration.component.html'
})
export class HeaderConfigurationComponent implements OnInit, OnDestroy {
  headerConfigurations: IHeaderConfiguration[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    protected headerConfigurationService: HeaderConfigurationService,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }

  loadAll() {
    this.headerConfigurationService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IHeaderConfiguration[]>) => this.paginateHeaderConfigurations(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/header-configuration'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/header-configuration',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInHeaderConfigurations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IHeaderConfiguration) {
    return item.id;
  }

  registerChangeInHeaderConfigurations() {
    this.eventSubscriber = this.eventManager.subscribe('headerConfigurationListModification', () => this.loadAll());
  }

  delete(headerConfiguration: IHeaderConfiguration) {
    const modalRef = this.modalService.open(HeaderConfigurationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.headerConfiguration = headerConfiguration;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateHeaderConfigurations(data: IHeaderConfiguration[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.headerConfigurations = data;
  }
}
