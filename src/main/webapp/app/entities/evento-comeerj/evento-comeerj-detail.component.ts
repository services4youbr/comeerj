import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EventoComeerj } from './evento-comeerj.model';
import { EventoComeerjService } from './evento-comeerj.service';

@Component({
    selector: 'jhi-evento-comeerj-detail',
    templateUrl: './evento-comeerj-detail.component.html'
})
export class EventoComeerjDetailComponent implements OnInit, OnDestroy {

    evento: EventoComeerj;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private eventoService: EventoComeerjService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEventos();
    }

    load(id) {
        this.eventoService.find(id)
            .subscribe((eventoResponse: HttpResponse<EventoComeerj>) => {
                this.evento = eventoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEventos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'eventoListModification',
            (response) => this.load(this.evento.id)
        );
    }
}
