import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICertifiedUser } from 'app/shared/model/certified-user.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CertifiedUserService } from './certified-user.service';
import { CertifiedUserDeleteDialogComponent } from './certified-user-delete-dialog.component';

@Component({
  selector: 'jhi-certified-user',
  templateUrl: './certified-user.component.html'
})
export class CertifiedUserComponent implements OnInit, OnDestroy {
  certifiedUsers: ICertifiedUser[];
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
    protected certifiedUserService: CertifiedUserService,
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
    this.certifiedUserService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<ICertifiedUser[]>) => this.paginateCertifiedUsers(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/certified-user'], {
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
      '/certified-user',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInCertifiedUsers();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICertifiedUser) {
    return item.id;
  }

  registerChangeInCertifiedUsers() {
    this.eventSubscriber = this.eventManager.subscribe('certifiedUserListModification', () => this.loadAll());
  }

  delete(certifiedUser: ICertifiedUser) {
    const modalRef = this.modalService.open(CertifiedUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.certifiedUser = certifiedUser;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateCertifiedUsers(data: ICertifiedUser[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.certifiedUsers = data;
  }
}
