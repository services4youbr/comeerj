import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComissaoComeerj } from './comissao-comeerj.model';
import { ComissaoComeerjPopupService } from './comissao-comeerj-popup.service';
import { ComissaoComeerjService } from './comissao-comeerj.service';

@Component({
    selector: 'jhi-comissao-comeerj-delete-dialog',
    templateUrl: './comissao-comeerj-delete-dialog.component.html'
})
export class ComissaoComeerjDeleteDialogComponent {

    comissao: ComissaoComeerj;

    constructor(
        private comissaoService: ComissaoComeerjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comissaoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'comissaoListModification',
                content: 'Deleted an comissao'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comissao-comeerj-delete-popup',
    template: ''
})
export class ComissaoComeerjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private comissaoPopupService: ComissaoComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.comissaoPopupService
                .open(ComissaoComeerjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
