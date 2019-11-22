import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { HeaderConfigurationDetailComponent } from 'app/entities/header-configuration/header-configuration-detail.component';
import { HeaderConfiguration } from 'app/shared/model/header-configuration.model';

describe('Component Tests', () => {
  describe('HeaderConfiguration Management Detail Component', () => {
    let comp: HeaderConfigurationDetailComponent;
    let fixture: ComponentFixture<HeaderConfigurationDetailComponent>;
    const route = ({ data: of({ headerConfiguration: new HeaderConfiguration('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [HeaderConfigurationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HeaderConfigurationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HeaderConfigurationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.headerConfiguration).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
