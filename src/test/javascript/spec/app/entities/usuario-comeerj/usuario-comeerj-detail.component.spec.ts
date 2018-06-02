/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ComeerjTestModule } from '../../../test.module';
import { UsuarioComeerjDetailComponent } from '../../../../../../main/webapp/app/entities/usuario-comeerj/usuario-comeerj-detail.component';
import { UsuarioComeerjService } from '../../../../../../main/webapp/app/entities/usuario-comeerj/usuario-comeerj.service';
import { UsuarioComeerj } from '../../../../../../main/webapp/app/entities/usuario-comeerj/usuario-comeerj.model';

describe('Component Tests', () => {

    describe('UsuarioComeerj Management Detail Component', () => {
        let comp: UsuarioComeerjDetailComponent;
        let fixture: ComponentFixture<UsuarioComeerjDetailComponent>;
        let service: UsuarioComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [UsuarioComeerjDetailComponent],
                providers: [
                    UsuarioComeerjService
                ]
            })
            .overrideTemplate(UsuarioComeerjDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioComeerjDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UsuarioComeerj(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.usuario).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
