import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GroupStatusService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http) {
        this.actionUrl = '/ace-bi/rest/group/measures';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    getGroupStatus(address: String, group: String): Observable<Response> {
      let url = address + '/' + this.actionUrl + "/" + group;
      console.info("Getting group status from " + url );
      return this.http.get(url, new RequestOptions({headers: this.headers}));
    }
}
