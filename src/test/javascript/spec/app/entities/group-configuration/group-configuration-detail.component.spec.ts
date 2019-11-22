import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { GroupConfigurationDetailComponent } from 'app/entities/group-configuration/group-configuration-detail.component';
import { GroupConfiguration } from 'app/shared/model/group-configuration.model';

describe('Component Tests', () => {
  describe('GroupConfiguration Management Detail Component', () => {
    let comp: GroupConfigurationDetailComponent;
    let fixture: ComponentFixture<GroupConfigurationDetailComponent>;
    const route = ({ data: of({ groupConfiguration: new GroupConfiguration('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [GroupConfigurationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GroupConfigurationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GroupConfigurationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.groupConfiguration).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
