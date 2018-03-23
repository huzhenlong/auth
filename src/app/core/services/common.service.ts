import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { isObject } from 'util';
import { HttpClient, HttpHeaders } from "@angular/common/http";

/**
 * 通用服务
 */
@Injectable()
export class CommonService {

    /**
     * 返回对象 {code:number,data:any}
     * @param res
     * @returns {any|{}}
     */
    private static extractJson(res: any) {
        // const body = res.json();
        const body = res;
        return body || {};
    }


    /**
     * 直接返回Data
     * @param res
     * @returns {{}}
     */
    private static extractJsonData(res: Response) {
        const body = res.json();
        return body.data;
    }

    public static handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    static appendParam(url: string, name: string, value: string) {
        if (url && name) {
            name += '=';
            if (url.indexOf(name) === -1) {
                if (url.indexOf('?') !== -1) {
                    url += '&';
                } else {
                    url += '?';
                }
                url += name + encodeURIComponent(value);
            }
        }
        return url;
    }

    static appendKey(url: string, key: string): string {
        if (key !== '') {
            if (url.indexOf('?') !== -1) {
                return url.replace('?', '/' + key);
            } else {
                if (!url.endsWith('/')) {
                    url += '/';
                }
                return url + key;
            }

        }
        return url;
    }

    static appendParams(url: string, paramObj: { [key: string]: any }) {
        for (const key in paramObj) {
            if (paramObj.hasOwnProperty(key)) {
                url = CommonService.appendParam(url, key, paramObj[key]);
            }
        }
        return url;
    }


    static generateFormData(obj: any): FormData {
        const fd = new FormData();
        if (obj && isObject(obj)) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    fd.append(key, obj[key]);
                }
            }
        }
        return fd;
    }

    constructor(private http: HttpClient) {
    }


    getJson(url: string): Promise<any> {
        return this.http.get(url)
            .toPromise()
            .then(CommonService.extractJson)
            .catch(CommonService.handleError);
    }

    getJsonData(url: string): Promise<any> {
        return this.http.get(url)
            .toPromise()
            .then(CommonService.extractJsonData)
            .catch(CommonService.handleError);
    }

    deleteJson(url: string, data?: any): Promise<any> {
        return this.http.delete(url, data)
            .toPromise()
            .then(CommonService.extractJson)
            .catch(CommonService.handleError);
    }

    deleteJsonData(url: string): Promise<any> {
        return this.http.delete(url)
            .toPromise()
            .then(CommonService.extractJsonData)
            .catch(CommonService.handleError);
    }

    postJson(url: string, data: any, opt?: any): Promise<any> {
        return this.http.post(url, data, opt)
            .toPromise()
            .then(CommonService.extractJson)
            .catch(CommonService.handleError);
    }

    postJsonData(url: string, data: any): Promise<any> {
        return this.http.post(url, data)
            .toPromise()
            .then(CommonService.extractJsonData)
            .catch(CommonService.handleError);
    }

    patchJson(url: string, data: any): Promise<any> {
        return this.http.patch(url, data)
            .toPromise()
            .then(CommonService.extractJson)
            .catch(CommonService.handleError);
    }


    putJson(url: string, data: any): Promise<any> {
        return this.http.put(url, data)
            .toPromise()
            .then(CommonService.extractJson)
            .catch(CommonService.handleError);
    }


    postForm(url, data) {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        const formData = CommonService.parseParam(data);
        return this.postJson(url, formData, {headers: headers});
    }

    static parseParam(param) {
        let paramStr = "";
        for (const key in param) {
            paramStr += '&' + key + '=' + encodeURIComponent(param[key] == null ? '' : param[key]);
        }
        return paramStr.substr(1);
    }
}
