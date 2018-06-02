/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ComeerjTestModule } from '../../../test.module';
import { AlojamentoComeerjDetailComponent } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj-detail.component';
import { AlojamentoComeerjService } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj.service';
import { AlojamentoComeerj } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj.model';

describe('Component Tests', () => {

    describe('AlojamentoComeerj Management Detail Component', () => {
        let comp: AlojamentoComeerjDetailComponent;
        let fixture: ComponentFixture<AlojamentoComeerjDetailComponent>;
        let service: AlojamentoComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [AlojamentoComeerjDetailComponent],
                providers: [
                    AlojamentoComeerjService
                ]
            })
            .overrideTemplate(AlojamentoComeerjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlojamentoComeerjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlojamentoComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AlojamentoComeerj(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.alojamento).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
