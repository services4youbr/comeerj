/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { UsuarioComeerjDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/usuario-comeerj/usuario-comeerj-delete-dialog.component';
import { UsuarioComeerjService } from '../../../../../../main/webapp/app/entities/usuario-comeerj/usuario-comeerj.service';

describe('Component Tests', () => {

    describe('UsuarioComeerj Management Delete Component', () => {
        let comp: UsuarioComeerjDeleteDialogComponent;
        let fixture: ComponentFixture<UsuarioComeerjDeleteDialogComponent>;
        let service: UsuarioComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [UsuarioComeerjDeleteDialogComponent],
                providers: [
                    UsuarioComeerjService
                ]
            })
            .overrideTemplate(UsuarioComeerjDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UsuarioComeerjDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsuarioComeerjService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
