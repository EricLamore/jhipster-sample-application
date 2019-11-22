import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHeaderConfiguration } from 'app/shared/model/header-configuration.model';

@Component({
  selector: 'jhi-header-configuration-detail',
  templateUrl: './header-configuration-detail.component.html'
})
export class HeaderConfigurationDetailComponent implements OnInit {
  headerConfiguration: IHeaderConfiguration;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ headerConfiguration }) => {
      this.headerConfiguration = headerConfiguration;
    });
  }

  previousState() {
    window.history.back();
  }
}
