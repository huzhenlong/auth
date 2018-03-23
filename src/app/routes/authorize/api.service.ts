import { Injectable } from '@angular/core';
import { CommonService } from '@core/services/common.service';


@Injectable()

export class AuthorizeApiService {
    prefixUrl = 'auth-api/v1';

    constructor(private cs: CommonService) {
    }

    getAppSelect() {
        const url = `${this.prefixUrl}/app_select_options`;
        return this.cs.getJson(url);
    }
    getOperations() {
        const url = `${this.prefixUrl}/operation`;
        return this.cs.getJson(url);
    }
    getPlatList() {
        const url = `${this.prefixUrl}/app`;
        return this.cs.getJson(url);
    }

    getAuth(id) {
        const url = `${this.prefixUrl}/auths/${id}`;
        return this.cs.getJson(url);
    }

    authToUser(data) {
        const url = `${this.prefixUrl}/authorize`;
        return this.cs.postJson(url, data);
    }

    getUserAuth(params) {
        const url = CommonService.appendParams(`${this.prefixUrl}/authorize`, params);
        return this.cs.getJson(url);
    }

    deleteUserAuth(id) {
        const url = `${this.prefixUrl}/authorize/${id}`;
        return this.cs.deleteJson(url);
    }

    deleteUserAuths(ids) {
        const url = `${this.prefixUrl}/authorizes`;
        return this.cs.postJson(url, {ids: ids});
    }

    checkAuth(data) {
        const url = `${this.prefixUrl}/check`;
        return this.cs.postJson(url, data);
    }
}
