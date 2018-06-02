import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EventoComeerj } from './evento-comeerj.model';
import { EventoComeerjPopupService } from './evento-comeerj-popup.service';
import { EventoComeerjService } from './evento-comeerj.service';

@Component({
    selector: 'jhi-evento-comeerj-dialog',
    templateUrl: './evento-comeerj-dialog.component.html'
})
export class EventoComeerjDialogComponent implements OnInit {

    evento: EventoComeerj;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private eventoService: EventoComeerjService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.evento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.eventoService.update(this.evento));
        } else {
            this.subscribeToSaveResponse(
                this.eventoService.create(this.evento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EventoComeerj>>) {
        result.subscribe((res: HttpResponse<EventoComeerj>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EventoComeerj) {
        this.eventManager.broadcast({ name: 'eventoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-evento-comeerj-popup',
    template: ''
})
export class EventoComeerjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventoPopupService: EventoComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.eventoPopupService
                    .open(EventoComeerjDialogComponent as Component, params['id']);
            } else {
                this.eventoPopupService
                    .open(EventoComeerjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
