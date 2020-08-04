import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Notification } from './notification.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class NotificationService {

    private resourceUrl =  SERVER_API_URL + '/notificationtype/api/notifications';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(notification: Notification): Observable<Notification> {
        const copy = this.convert(notification);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(notification: Notification): Observable<Notification> {
        const copy = this.convert(notification);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Notification> {
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
     * Convert a returned JSON object to Notification.
     */
    private convertItemFromServer(json: any): Notification {
        const entity: Notification = Object.assign(new Notification(), json);
        entity.date = this.dateUtils
            .convertDateTimeFromServer(json.date);
        entity.sentDate = this.dateUtils
            .convertDateTimeFromServer(json.sentDate);
        return entity;
    }

    /**
     * Convert a Notification to a JSON which can be sent to the server.
     */
    private convert(notification: Notification): Notification {
        const copy: Notification = Object.assign({}, notification);

        copy.date = this.dateUtils.toDate(notification.date);

        copy.sentDate = this.dateUtils.toDate(notification.sentDate);
        return copy;
    }
}
