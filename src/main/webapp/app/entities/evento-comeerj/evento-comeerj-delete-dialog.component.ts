import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EventoComeerj } from './evento-comeerj.model';
import { EventoComeerjPopupService } from './evento-comeerj-popup.service';
import { EventoComeerjService } from './evento-comeerj.service';

@Component({
    selector: 'jhi-evento-comeerj-delete-dialog',
    templateUrl: './evento-comeerj-delete-dialog.component.html'
})
export class EventoComeerjDeleteDialogComponent {

    evento: EventoComeerj;

    constructor(
        private eventoService: EventoComeerjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.eventoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'eventoListModification',
                content: 'Deleted an evento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-evento-comeerj-delete-popup',
    template: ''
})
export class EventoComeerjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private eventoPopupService: EventoComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.eventoPopupService
                .open(EventoComeerjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
