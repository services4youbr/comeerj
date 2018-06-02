import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComissaoComeerj } from './comissao-comeerj.model';
import { ComissaoComeerjPopupService } from './comissao-comeerj-popup.service';
import { ComissaoComeerjService } from './comissao-comeerj.service';

@Component({
    selector: 'jhi-comissao-comeerj-dialog',
    templateUrl: './comissao-comeerj-dialog.component.html'
})
export class ComissaoComeerjDialogComponent implements OnInit {

    comissao: ComissaoComeerj;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private comissaoService: ComissaoComeerjService,
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
        if (this.comissao.id !== undefined) {
            this.subscribeToSaveResponse(
                this.comissaoService.update(this.comissao));
        } else {
            this.subscribeToSaveResponse(
                this.comissaoService.create(this.comissao));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComissaoComeerj>>) {
        result.subscribe((res: HttpResponse<ComissaoComeerj>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComissaoComeerj) {
        this.eventManager.broadcast({ name: 'comissaoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-comissao-comeerj-popup',
    template: ''
})
export class ComissaoComeerjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comissaoPopupService: ComissaoComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.comissaoPopupService
                    .open(ComissaoComeerjDialogComponent as Component, params['id']);
            } else {
                this.comissaoPopupService
                    .open(ComissaoComeerjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
