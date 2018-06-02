import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PoloComeerj } from './polo-comeerj.model';
import { PoloComeerjPopupService } from './polo-comeerj-popup.service';
import { PoloComeerjService } from './polo-comeerj.service';

@Component({
    selector: 'jhi-polo-comeerj-dialog',
    templateUrl: './polo-comeerj-dialog.component.html'
})
export class PoloComeerjDialogComponent implements OnInit {

    polo: PoloComeerj;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private poloService: PoloComeerjService,
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
        if (this.polo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.poloService.update(this.polo));
        } else {
            this.subscribeToSaveResponse(
                this.poloService.create(this.polo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PoloComeerj>>) {
        result.subscribe((res: HttpResponse<PoloComeerj>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PoloComeerj) {
        this.eventManager.broadcast({ name: 'poloListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-polo-comeerj-popup',
    template: ''
})
export class PoloComeerjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private poloPopupService: PoloComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.poloPopupService
                    .open(PoloComeerjDialogComponent as Component, params['id']);
            } else {
                this.poloPopupService
                    .open(PoloComeerjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
