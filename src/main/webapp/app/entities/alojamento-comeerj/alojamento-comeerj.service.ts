import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AlojamentoComeerj } from './alojamento-comeerj.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AlojamentoComeerj>;

@Injectable()
export class AlojamentoComeerjService {

    private resourceUrl =  SERVER_API_URL + 'api/alojamentos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/alojamentos';

    constructor(private http: HttpClient) { }

    create(alojamento: AlojamentoComeerj): Observable<EntityResponseType> {
        const copy = this.convert(alojamento);
        return this.http.post<AlojamentoComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(alojamento: AlojamentoComeerj): Observable<EntityResponseType> {
        const copy = this.convert(alojamento);
        return this.http.put<AlojamentoComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AlojamentoComeerj>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AlojamentoComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<AlojamentoComeerj[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlojamentoComeerj[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<AlojamentoComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<AlojamentoComeerj[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AlojamentoComeerj[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AlojamentoComeerj = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AlojamentoComeerj[]>): HttpResponse<AlojamentoComeerj[]> {
        const jsonResponse: AlojamentoComeerj[] = res.body;
        const body: AlojamentoComeerj[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AlojamentoComeerj.
     */
    private convertItemFromServer(alojamento: AlojamentoComeerj): AlojamentoComeerj {
        const copy: AlojamentoComeerj = Object.assign({}, alojamento);
        return copy;
    }

    /**
     * Convert a AlojamentoComeerj to a JSON which can be sent to the server.
     */
    private convert(alojamento: AlojamentoComeerj): AlojamentoComeerj {
        const copy: AlojamentoComeerj = Object.assign({}, alojamento);
        return copy;
    }
}
