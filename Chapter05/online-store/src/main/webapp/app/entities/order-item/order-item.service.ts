import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrderItem } from './order-item.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OrderItemService {

    private resourceUrl =  SERVER_API_URL + 'api/order-items';

    constructor(private http: Http) { }

    create(orderItem: OrderItem): Observable<OrderItem> {
        const copy = this.convert(orderItem);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(orderItem: OrderItem): Observable<OrderItem> {
        const copy = this.convert(orderItem);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OrderItem> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to OrderItem.
     */
    private convertItemFromServer(json: any): OrderItem {
        const entity: OrderItem = Object.assign(new OrderItem(), json);
        return entity;
    }

    /**
     * Convert a OrderItem to a JSON which can be sent to the server.
     */
    private convert(orderItem: OrderItem): OrderItem {
        const copy: OrderItem = Object.assign({}, orderItem);
        return copy;
    }
}
