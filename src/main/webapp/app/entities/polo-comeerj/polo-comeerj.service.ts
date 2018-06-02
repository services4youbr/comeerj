import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PoloComeerj } from './polo-comeerj.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PoloComeerj>;

@Injectable()
export class PoloComeerjService {

    private resourceUrl =  SERVER_API_URL + 'api/polos';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/polos';

    constructor(private http: HttpClient) { }

    create(polo: PoloComeerj): Observable<EntityResponseType> {
        const copy = this.convert(polo);
        return this.http.post<PoloComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(polo: PoloComeerj): Observable<EntityResponseType> {
        const copy = this.convert(polo);
        return this.http.put<PoloComeerj>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PoloComeerj>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PoloComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<PoloComeerj[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PoloComeerj[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PoloComeerj[]>> {
        const options = createRequestOption(req);
        return this.http.get<PoloComeerj[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PoloComeerj[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PoloComeerj = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PoloComeerj[]>): HttpResponse<PoloComeerj[]> {
        const jsonResponse: PoloComeerj[] = res.body;
        const body: PoloComeerj[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PoloComeerj.
     */
    private convertItemFromServer(polo: PoloComeerj): PoloComeerj {
        const copy: PoloComeerj = Object.assign({}, polo);
        return copy;
    }

    /**
     * Convert a PoloComeerj to a JSON which can be sent to the server.
     */
    private convert(polo: PoloComeerj): PoloComeerj {
        const copy: PoloComeerj = Object.assign({}, polo);
        return copy;
    }
}
