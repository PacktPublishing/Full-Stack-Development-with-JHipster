import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Customer } from './customer.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Customer>;

@Injectable()
export class CustomerService {

    private resourceUrl =  SERVER_API_URL + 'api/customers';

    constructor(private http: HttpClient) { }

    create(customer: Customer): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.post<Customer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(customer: Customer): Observable<EntityResponseType> {
        const copy = this.convert(customer);
        return this.http.put<Customer>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Customer>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Customer[]>> {
        const options = createRequestOption(req);
        return this.http.get<Customer[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Customer[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Customer = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Customer[]>): HttpResponse<Customer[]> {
        const jsonResponse: Customer[] = res.body;
        const body: Customer[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Customer.
     */
    private convertItemFromServer(customer: Customer): Customer {
        const copy: Customer = Object.assign({}, customer);
        return copy;
    }

    /**
     * Convert a Customer to a JSON which can be sent to the server.
     */
    private convert(customer: Customer): Customer {
        const copy: Customer = Object.assign({}, customer);
        return copy;
    }
}
