/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeerjTestModule } from '../../../test.module';
import { FaixaEtariaComeerjComponent } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj.component';
import { FaixaEtariaComeerjService } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj.service';
import { FaixaEtariaComeerj } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj.model';

describe('Component Tests', () => {

    describe('FaixaEtariaComeerj Management Component', () => {
        let comp: FaixaEtariaComeerjComponent;
        let fixture: ComponentFixture<FaixaEtariaComeerjComponent>;
        let service: FaixaEtariaComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [FaixaEtariaComeerjComponent],
                providers: [
                    FaixaEtariaComeerjService
                ]
            })
            .overrideTemplate(FaixaEtariaComeerjComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FaixaEtariaComeerjComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaixaEtariaComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FaixaEtariaComeerj(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.faixaEtarias[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
