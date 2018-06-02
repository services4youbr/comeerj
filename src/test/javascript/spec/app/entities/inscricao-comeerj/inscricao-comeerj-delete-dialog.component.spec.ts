/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { InscricaoComeerjDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj-delete-dialog.component';
import { InscricaoComeerjService } from '../../../../../../main/webapp/app/entities/inscricao-comeerj/inscricao-comeerj.service';

describe('Component Tests', () => {

    describe('InscricaoComeerj Management Delete Component', () => {
        let comp: InscricaoComeerjDeleteDialogComponent;
        let fixture: ComponentFixture<InscricaoComeerjDeleteDialogComponent>;
        let service: InscricaoComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [InscricaoComeerjDeleteDialogComponent],
                providers: [
                    InscricaoComeerjService
                ]
            })
            .overrideTemplate(InscricaoComeerjDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(InscricaoComeerjDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InscricaoComeerjService);
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
