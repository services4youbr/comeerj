import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { InscricaoComeerj } from './inscricao-comeerj.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<InscricaoComeerj>;

@Injectable()
export class InscricaoComeerjService {

    private resourceUrl =  SERVER_API_URL + 'api/inscricaos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/inscricaos';

    constructor(private http: HttpClient) { }

    create(inscricao: InscricaoComeerj): Observable<EntityResponseType> {
        const copy = this.convert(inscricao);
        return this.http.post<InscricaoComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(inscricao: InscricaoComeerj): Observable<EntityResponseType> {
        const copy = this.convert(inscricao);
        return this.http.put<InscricaoComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<InscricaoComeerj>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<InscricaoComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<InscricaoComeerj[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InscricaoComeerj[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<InscricaoComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<InscricaoComeerj[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<InscricaoComeerj[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: InscricaoComeerj = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<InscricaoComeerj[]>): HttpResponse<InscricaoComeerj[]> {
        const jsonResponse: InscricaoComeerj[] = res.body;
        const body: InscricaoComeerj[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to InscricaoComeerj.
     */
    private convertItemFromServer(inscricao: InscricaoComeerj): InscricaoComeerj {
        const copy: InscricaoComeerj = Object.assign({}, inscricao);
        return copy;
    }

    /**
     * Convert a InscricaoComeerj to a JSON which can be sent to the server.
     */
    private convert(inscricao: InscricaoComeerj): InscricaoComeerj {
        const copy: InscricaoComeerj = Object.assign({}, inscricao);
        return copy;
    }
}
