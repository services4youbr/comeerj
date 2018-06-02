/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { ComissaoComeerjDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/comissao-comeerj/comissao-comeerj-delete-dialog.component';
import { ComissaoComeerjService } from '../../../../../../main/webapp/app/entities/comissao-comeerj/comissao-comeerj.service';

describe('Component Tests', () => {

    describe('ComissaoComeerj Management Delete Component', () => {
        let comp: ComissaoComeerjDeleteDialogComponent;
        let fixture: ComponentFixture<ComissaoComeerjDeleteDialogComponent>;
        let service: ComissaoComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [ComissaoComeerjDeleteDialogComponent],
                providers: [
                    ComissaoComeerjService
                ]
            })
            .overrideTemplate(ComissaoComeerjDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComissaoComeerjDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComissaoComeerjService);
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
