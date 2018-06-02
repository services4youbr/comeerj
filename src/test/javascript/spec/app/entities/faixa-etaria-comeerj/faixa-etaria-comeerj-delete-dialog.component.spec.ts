/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { FaixaEtariaComeerjDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj-delete-dialog.component';
import { FaixaEtariaComeerjService } from '../../../../../../main/webapp/app/entities/faixa-etaria-comeerj/faixa-etaria-comeerj.service';

describe('Component Tests', () => {

    describe('FaixaEtariaComeerj Management Delete Component', () => {
        let comp: FaixaEtariaComeerjDeleteDialogComponent;
        let fixture: ComponentFixture<FaixaEtariaComeerjDeleteDialogComponent>;
        let service: FaixaEtariaComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [FaixaEtariaComeerjDeleteDialogComponent],
                providers: [
                    FaixaEtariaComeerjService
                ]
            })
            .overrideTemplate(FaixaEtariaComeerjDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FaixaEtariaComeerjDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FaixaEtariaComeerjService);
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
