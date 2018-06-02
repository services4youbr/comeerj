/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ComeerjTestModule } from '../../../test.module';
import { TurmaComeerjDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj-delete-dialog.component';
import { TurmaComeerjService } from '../../../../../../main/webapp/app/entities/turma-comeerj/turma-comeerj.service';

describe('Component Tests', () => {

    describe('TurmaComeerj Management Delete Component', () => {
        let comp: TurmaComeerjDeleteDialogComponent;
        let fixture: ComponentFixture<TurmaComeerjDeleteDialogComponent>;
        let service: TurmaComeerjService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ComeerjTestModule],
                declarations: [TurmaComeerjDeleteDialogComponent],
                providers: [
                    TurmaComeerjService
                ]
            })
            .overrideTemplate(TurmaComeerjDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TurmaComeerjDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TurmaComeerjService);
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
