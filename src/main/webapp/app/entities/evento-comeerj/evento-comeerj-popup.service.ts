import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { EventoComeerj } from './evento-comeerj.model';
import { EventoComeerjService } from './evento-comeerj.service';

@Injectable()
export class EventoComeerjPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private eventoService: EventoComeerjService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.eventoService.find(id)
                    .subscribe((eventoResponse: HttpResponse<EventoComeerj>) => {
                        const evento: EventoComeerj = eventoResponse.body;
                        evento.inicioEvento = this.datePipe
                            .transform(evento.inicioEvento, 'yyyy-MM-ddTHH:mm:ss');
                        evento.fimEvento = this.datePipe
                            .transform(evento.fimEvento, 'yyyy-MM-ddTHH:mm:ss');
                        evento.inicioInscricoes = this.datePipe
                            .transform(evento.inicioInscricoes, 'yyyy-MM-ddTHH:mm:ss');
                        evento.fimInscricoes = this.datePipe
                            .transform(evento.fimInscricoes, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.eventoModalRef(component, evento);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.eventoModalRef(component, new EventoComeerj());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    eventoModalRef(component: Component, evento: EventoComeerj): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.evento = evento;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
