import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MapPropertiesDetailComponent } from 'app/entities/map-properties/map-properties-detail.component';
import { MapProperties } from 'app/shared/model/map-properties.model';

describe('Component Tests', () => {
  describe('MapProperties Management Detail Component', () => {
    let comp: MapPropertiesDetailComponent;
    let fixture: ComponentFixture<MapPropertiesDetailComponent>;
    const route = ({ data: of({ mapProperties: new MapProperties('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [MapPropertiesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MapPropertiesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MapPropertiesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mapProperties).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
