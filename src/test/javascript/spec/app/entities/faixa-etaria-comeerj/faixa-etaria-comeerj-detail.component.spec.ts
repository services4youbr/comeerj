/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ComeerjTestModule } from '../../../test.module';
import { FaixaEtariaComeerjDetailComponent } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj-detail.component';
import { FaixaEtariaComeerjService } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj.service';
import { FaixaEtariaComeerj } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj.model';

describe('Component Tests', () => {

    describe('FaixaEtariaComeerj Management Detail Component', () => {
        let comp: FaixaEtariaComeerjDetailComponent;
        let fixture: ComponentFixture<FaixaEtariaComeerjDetailComponent>;
        let service: FaixaEtariaComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [FaixaEtariaComeerjDetailComponent],
                providers: [
                    FaixaEtariaComeerjService
                ]
            })
            .overrideTemplate(FaixaEtariaComeerjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FaixaEtariaComeerjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaixaEtariaComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FaixaEtariaComeerj(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.faixaEtaria).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
