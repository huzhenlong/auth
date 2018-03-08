import { Injectable } from "@angular/core";
import { CommonService } from "app/core/services/common.service";

@Injectable()

export class PlatformDetailService {
    prefixUrl = '/auth-api/v1';
    constructor(private cs: CommonService) {}

    getPlatCon(id) {
        const url = `${this.prefixUrl}/app/${id}`;
        return this.cs.getJson(url);
    }

    getOpeList() {
        const url = `${this.prefixUrl}/operation`;
        return this.cs.getJson(url);
    }

    updatePlat(id, data) {
        const url = `${this.prefixUrl}/app/${id}`;
        return this.cs.patchJson(url, data);
    }

    createAuth(data) {
        const url = `${this.prefixUrl}/auth`;
        return this.cs.postJson(url, data);
    }

    updateAuth(id, data) {
        const url = `${this.prefixUrl}/auth/${id}`;
        return this.cs.putJson(url, data);
    }

    deleteAuth(id) {
        const url = `${this.prefixUrl}/auth/${id}`;
        return this.cs.deleteJson(url);
    }

    getAuth(id) {
        const url = `${this.prefixUrl}/auth/${id}`;
        return this.cs.getJson(url);
    }

}
