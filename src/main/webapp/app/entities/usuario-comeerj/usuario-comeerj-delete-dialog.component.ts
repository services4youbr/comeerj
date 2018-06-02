import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarioComeerj } from './usuario-comeerj.model';
import { UsuarioComeerjPopupService } from './usuario-comeerj-popup.service';
import { UsuarioComeerjService } from './usuario-comeerj.service';

@Component({
    selector: 'jhi-usuario-comeerj-delete-dialog',
    templateUrl: './usuario-comeerj-delete-dialog.component.html'
})
export class UsuarioComeerjDeleteDialogComponent {

    usuario: UsuarioComeerj;

    constructor(
        private usuarioService: UsuarioComeerjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuarioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'usuarioListModification',
                content: 'Deleted an usuario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usuario-comeerj-delete-popup',
    template: ''
})
export class UsuarioComeerjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioPopupService: UsuarioComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.usuarioPopupService
                .open(UsuarioComeerjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
