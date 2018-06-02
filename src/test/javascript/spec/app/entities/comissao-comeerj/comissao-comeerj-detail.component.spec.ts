/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ComeerjTestModule } from '../../../test.module';
import { ComissaoComeerjDetailComponent } from '../../../../../../main/webapp/app/entities/comissao-comeerj/comissao-comeerj-detail.component';
import { ComissaoComeerjService } from '../../../../../../main/webapp/app/entities/comissao-comeerj/comissao-comeerj.service';
import { ComissaoComeerj } from '../../../../../../main/webapp/app/entities/comissao-comeerj/comissao-comeerj.model';

describe('Component Tests', () => {

    describe('ComissaoComeerj Management Detail Component', () => {
        let comp: ComissaoComeerjDetailComponent;
        let fixture: ComponentFixture<ComissaoComeerjDetailComponent>;
        let service: ComissaoComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [ComissaoComeerjDetailComponent],
                providers: [
                    ComissaoComeerjService
                ]
            })
            .overrideTemplate(ComissaoComeerjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComissaoComeerjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComissaoComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComissaoComeerj(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comissao).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
