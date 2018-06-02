import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EventoComeerj } from './evento-comeerj.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EventoComeerj>;

@Injectable()
export class EventoComeerjService {

    private resourceUrl =  SERVER_API_URL + 'api/eventos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/eventos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(evento: EventoComeerj): Observable<EntityResponseType> {
        const copy = this.convert(evento);
        return this.http.post<EventoComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(evento: EventoComeerj): Observable<EntityResponseType> {
        const copy = this.convert(evento);
        return this.http.put<EventoComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EventoComeerj>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EventoComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<EventoComeerj[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EventoComeerj[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<EventoComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<EventoComeerj[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EventoComeerj[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EventoComeerj = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EventoComeerj[]>): HttpResponse<EventoComeerj[]> {
        const jsonResponse: EventoComeerj[] = res.body;
        const body: EventoComeerj[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EventoComeerj.
     */
    private convertItemFromServer(evento: EventoComeerj): EventoComeerj {
        const copy: EventoComeerj = Object.assign({}, evento);
        copy.inicioEvento = this.dateUtils
            .convertDateTimeFromServer(evento.inicioEvento);
        copy.fimEvento = this.dateUtils
            .convertDateTimeFromServer(evento.fimEvento);
        copy.inicioInscricoes = this.dateUtils
            .convertDateTimeFromServer(evento.inicioInscricoes);
        copy.fimInscricoes = this.dateUtils
            .convertDateTimeFromServer(evento.fimInscricoes);
        return copy;
    }

    /**
     * Convert a EventoComeerj to a JSON which can be sent to the server.
     */
    private convert(evento: EventoComeerj): EventoComeerj {
        const copy: EventoComeerj = Object.assign({}, evento);

        copy.inicioEvento = this.dateUtils.toDate(evento.inicioEvento);

        copy.fimEvento = this.dateUtils.toDate(evento.fimEvento);

        copy.inicioInscricoes = this.dateUtils.toDate(evento.inicioInscricoes);

        copy.fimInscricoes = this.dateUtils.toDate(evento.fimInscricoes);
        return copy;
    }
}
