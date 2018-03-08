import {Injectable} from "@angular/core";
import {CommonService} from "app/core/services/common.service";

@Injectable()

export class AuthorizeListService {
    prefixUrl = 'auth-api/v1';

    constructor(private cs: CommonService) {
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

}
