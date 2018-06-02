import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { InscricaoComeerj } from './inscricao-comeerj.model';
import { InscricaoComeerjService } from './inscricao-comeerj.service';

@Injectable()
export class InscricaoComeerjPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private inscricaoService: InscricaoComeerjService

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
                this.inscricaoService.find(id)
                    .subscribe((inscricaoResponse: HttpResponse<InscricaoComeerj>) => {
                        const inscricao: InscricaoComeerj = inscricaoResponse.body;
                        this.ngbModalRef = this.inscricaoModalRef(component, inscricao);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.inscricaoModalRef(component, new InscricaoComeerj());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    inscricaoModalRef(component: Component, inscricao: InscricaoComeerj): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.inscricao = inscricao;
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
