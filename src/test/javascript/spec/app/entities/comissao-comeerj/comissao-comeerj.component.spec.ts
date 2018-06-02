/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeerjTestModule } from '../../../test.module';
import { ComissaoComeerjComponent } from '../../../../../../main/webapp/app/entities/comissao-comeerj/comissao-comeerj.component';
import { ComissaoComeerjService } from '../../../../../../main/webapp/app/entities/comissao-comeerj/comissao-comeerj.service';
import { ComissaoComeerj } from '../../../../../../main/webapp/app/entities/comissao-comeerj/comissao-comeerj.model';

describe('Component Tests', () => {

    describe('ComissaoComeerj Management Component', () => {
        let comp: ComissaoComeerjComponent;
        let fixture: ComponentFixture<ComissaoComeerjComponent>;
        let service: ComissaoComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [ComissaoComeerjComponent],
                providers: [
                    ComissaoComeerjService
                ]
            })
            .overrideTemplate(ComissaoComeerjComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComissaoComeerjComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComissaoComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComissaoComeerj(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.comissaos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
