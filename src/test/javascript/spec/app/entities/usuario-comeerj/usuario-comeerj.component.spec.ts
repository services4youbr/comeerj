/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ComeerjTestModule } from '../../../test.module';
import { UsuarioComeerjComponent } from '../../../../../../main/webapp/app/entities/usuario-comeerj/usuario-comeerj.component';
import { UsuarioComeerjService } from '../../../../../../main/webapp/app/entities/usuario-comeerj/usuario-comeerj.service';
import { UsuarioComeerj } from '../../../../../../main/webapp/app/entities/usuario-comeerj/usuario-comeerj.model';

describe('Component Tests', () => {

    describe('UsuarioComeerj Management Component', () => {
        let comp: UsuarioComeerjComponent;
        let fixture: ComponentFixture<UsuarioComeerjComponent>;
        let service: UsuarioComeerjService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [UsuarioComeerjComponent],
                providers: [
                    UsuarioComeerjService
                ]
            })
            .overrideTemplate(UsuarioComeerjComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioComeerjComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioComeerjService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UsuarioComeerj(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.usuarios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
