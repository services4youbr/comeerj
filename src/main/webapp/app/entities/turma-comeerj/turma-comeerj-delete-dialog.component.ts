import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TurmaComeerj } from './turma-comeerj.model';
import { TurmaComeerjPopupService } from './turma-comeerj-popup.service';
import { TurmaComeerjService } from './turma-comeerj.service';

@Component({
    selector: 'jhi-turma-comeerj-delete-dialog',
    templateUrl: './turma-comeerj-delete-dialog.component.html'
})
export class TurmaComeerjDeleteDialogComponent {

    turma: TurmaComeerj;

    constructor(
        private turmaService: TurmaComeerjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.turmaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'turmaListModification',
                content: 'Deleted an turma'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-turma-comeerj-delete-popup',
    template: ''
})
export class TurmaComeerjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private turmaPopupService: TurmaComeerjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.turmaPopupService
                .open(TurmaComeerjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
