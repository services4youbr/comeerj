/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { AlojamentoComeerjDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj-delete-dialog.component';
import { AlojamentoComeerjService } from '../../../../../../main/webapp/app/entities/alojamento-comeerj/alojamento-comeerj.service';

describe('Component Tests', () => {

    describe('AlojamentoComeerj Management Delete Component', () => {
        let comp: AlojamentoComeerjDeleteDialogComponent;
        let fixture: ComponentFixture<AlojamentoComeerjDeleteDialogComponent>;
        let service: AlojamentoComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [AlojamentoComeerjDeleteDialogComponent],
                providers: [
                    AlojamentoComeerjService
                ]
            })
            .overrideTemplate(AlojamentoComeerjDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlojamentoComeerjDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlojamentoComeerjService);
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
