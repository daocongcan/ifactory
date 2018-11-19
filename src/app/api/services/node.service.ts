/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpRequest, HttpResponse, 
  HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { Node } from '../models/node';
// import { CreateNode } from '../models/create-Node';
// import { UpdateNode } from '../models/update-Node';


@Injectable()
export class NodeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * get list of Node
   */
  listNodeResponse(): Observable<HttpResponse<Node[]>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `node/getall`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Node[] = null;
        _body = _resp.body as Node[]
        return _resp.clone({body: _body}) as HttpResponse<Node[]>;
      })
    );
  }

  /**
   * get list of Node
   */
  listNode(): Observable<Node[]> {
    return this.listNodeResponse().pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Create Node
   * @param body - Created Node object
   */
  createNodeResponse(body: Node): Observable<HttpResponse<Node>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "POST",
      this.rootUrl + `node/create`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Node = null;
        _body = _resp.body as Node
        return _resp.clone({body: _body}) as HttpResponse<Node>;
      })
    );
  }

  /**
   * Create Node
   * @param body - Created Node object
   */
  createNode(body: Node): Observable<Node> {
    return this.createNodeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * @param body - undefined
   */
  updateNodeResponse(body?: Node): Observable<HttpResponse<Node>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      "PUT",
      this.rootUrl + `node/update/${body._id}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Node = null;
        _body = _resp.body as Node
        return _resp.clone({body: _body}) as HttpResponse<Node>;
      })
    );
  }

  /**
   * @param body - undefined
   */
  updateNode(body?: Node): Observable<Node> {
    return this.updateNodeResponse(body).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Returns a single Node
   * @param NodeId - ID of Node to return
   */
  getNodeByIdResponse(NodeId: number): Observable<HttpResponse<Node>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "GET",
      this.rootUrl + `/Node/${NodeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: Node = null;
        _body = _resp.body as Node
        return _resp.clone({body: _body}) as HttpResponse<Node>;
      })
    );
  }

  /**
   * Returns a single Node
   * @param NodeId - ID of Node to return
   */
  getNodeById(NodeId: number): Observable<Node> {
    return this.getNodeByIdResponse(NodeId).pipe(
      map(_r => _r.body)
    );
  }
  /**
   * Deletes a Node
   * @param NodeId - Node id to delete
   */
  deleteNodeResponse(NodeId: number): Observable<HttpResponse<void>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    
    let req = new HttpRequest<any>(
      "DELETE",
      this.rootUrl + `node/delete/${NodeId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map(_r => {
        let _resp = _r as HttpResponse<any>;
        let _body: void = null;
        
        return _resp.clone({body: _body}) as HttpResponse<void>;
      })
    );
  }

  /**
   * Deletes a Node
   * @param NodeId - Node id to delete
   */
  deleteNode(NodeId: number): Observable<void> {
    return this.deleteNodeResponse(NodeId).pipe(
      map(_r => _r.body)
    );
  }}

export module NodeService {
}
