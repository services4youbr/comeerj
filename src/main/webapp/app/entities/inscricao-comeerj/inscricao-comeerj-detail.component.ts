import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { InscricaoComeerj } from './inscricao-comeerj.model';
import { InscricaoComeerjService } from './inscricao-comeerj.service';

@Component({
    selector: 'jhi-inscricao-comeerj-detail',
    templateUrl: './inscricao-comeerj-detail.component.html'
})
export class InscricaoComeerjDetailComponent implements OnInit, OnDestroy {

    inscricao: InscricaoComeerj;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private inscricaoService: InscricaoComeerjService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInInscricaos();
    }

    load(id) {
        this.inscricaoService.find(id)
            .subscribe((inscricaoResponse: HttpResponse<InscricaoComeerj>) => {
                this.inscricao = inscricaoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInInscricaos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'inscricaoListModification',
            (response) => this.load(this.inscricao.id)
        );
    }
}
