import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarioComeerj } from './usuario-comeerj.model';
import { UsuarioComeerjPopupService } from './usuario-comeerj-popup.service';
import { UsuarioComeerjService } from './usuario-comeerj.service';

@Component({
    selector: 'jhi-usuario-comeerj-dialog',
    templateUrl: './usuario-comeerj-dialog.component.html'
})
export class UsuarioComeerjDialogComponent implements OnInit {

    usuario: UsuarioComeerj;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private usuarioService: UsuarioComeerjService,
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
        if (this.usuario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuarioService.update(this.usuario));
        } else {
            this.subscribeToSaveResponse(
                this.usuarioService.create(this.usuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UsuarioComeerj>>) {
        result.subscribe((res: HttpResponse<UsuarioComeerj>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UsuarioComeerj) {
        this.eventManager.broadcast({ name: 'usuarioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-usuario-comeerj-popup',
    template: ''
})
export class UsuarioComeerjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioPopupService: UsuarioComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarioPopupService
                    .open(UsuarioComeerjDialogComponent as Component, params['id']);
            } else {
                this.usuarioPopupService
                    .open(UsuarioComeerjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
