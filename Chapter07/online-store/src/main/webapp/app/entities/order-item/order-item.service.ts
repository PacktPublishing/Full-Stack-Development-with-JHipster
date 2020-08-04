import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderItem } from './order-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrderItem>;

@Injectable()
export class OrderItemService {

    private resourceUrl =  SERVER_API_URL + 'api/order-items';

    constructor(private http: HttpClient) { }

    create(orderItem: OrderItem): Observable<EntityResponseType> {
        const copy = this.convert(orderItem);
        return this.http.post<OrderItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(orderItem: OrderItem): Observable<EntityResponseType> {
        const copy = this.convert(orderItem);
        return this.http.put<OrderItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrderItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrderItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrderItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrderItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrderItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrderItem[]>): HttpResponse<OrderItem[]> {
        const jsonResponse: OrderItem[] = res.body;
        const body: OrderItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrderItem.
     */
    private convertItemFromServer(orderItem: OrderItem): OrderItem {
        const copy: OrderItem = Object.assign({}, orderItem);
        return copy;
    }

    /**
     * Convert a OrderItem to a JSON which can be sent to the server.
     */
    private convert(orderItem: OrderItem): OrderItem {
        const copy: OrderItem = Object.assign({}, orderItem);
        return copy;
    }
}
