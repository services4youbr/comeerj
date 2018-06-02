import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AlojamentoComeerj } from './alojamento-comeerj.model';
import { AlojamentoComeerjService } from './alojamento-comeerj.service';

@Component({
    selector: 'jhi-alojamento-comeerj-detail',
    templateUrl: './alojamento-comeerj-detail.component.html'
})
export class AlojamentoComeerjDetailComponent implements OnInit, OnDestroy {

    alojamento: AlojamentoComeerj;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private alojamentoService: AlojamentoComeerjService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAlojamentos();
    }

    load(id) {
        this.alojamentoService.find(id)
            .subscribe((alojamentoResponse: HttpResponse<AlojamentoComeerj>) => {
                this.alojamento = alojamentoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlojamentos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'alojamentoListModification',
            (response) => this.load(this.alojamento.id)
        );
    }
}
