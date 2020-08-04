import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Invoice } from './invoice.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Invoice>;

@Injectable()
export class InvoiceService {

    private resourceUrl =  SERVER_API_URL + 'api/invoices';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(invoice: Invoice): Observable<EntityResponseType> {
        const copy = this.convert(invoice);
        return this.http.post<Invoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(invoice: Invoice): Observable<EntityResponseType> {
        const copy = this.convert(invoice);
        return this.http.put<Invoice>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Invoice>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Invoice[]>> {
        const options = createRequestOption(req);
        return this.http.get<Invoice[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Invoice[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Invoice = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Invoice[]>): HttpResponse<Invoice[]> {
        const jsonResponse: Invoice[] = res.body;
        const body: Invoice[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Invoice.
     */
    private convertItemFromServer(invoice: Invoice): Invoice {
        const copy: Invoice = Object.assign({}, invoice);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(invoice.date);
        copy.paymentDate = this.dateUtils
            .convertDateTimeFromServer(invoice.paymentDate);
        return copy;
    }

    /**
     * Convert a Invoice to a JSON which can be sent to the server.
     */
    private convert(invoice: Invoice): Invoice {
        const copy: Invoice = Object.assign({}, invoice);

        copy.date = this.dateUtils.toDate(invoice.date);

        copy.paymentDate = this.dateUtils.toDate(invoice.paymentDate);
        return copy;
    }
}
