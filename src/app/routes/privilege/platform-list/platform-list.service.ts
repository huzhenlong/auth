import {Injectable} from "@angular/core";
import {CommonService} from "app/core/services/common.service";

@Injectable()

export class PlatformListService {
    prefixUrl = 'auth-api/v1/app';

    constructor(private cs: CommonService) {
    }

    getPlatList() {
        const url = `${this.prefixUrl}`;
        return this.cs.getJson(url);
    }

    createPlat(data) {
        const url = `${this.prefixUrl}`;
        return this.cs.postJson(url, data);
    }

    updatePlat(id, data) {
        const url = `${this.prefixUrl}/${id}`;
        return this.cs.putJson(url, data);
    }

    deletePlat(id) {
        const url = `${this.prefixUrl}/${id}`;
        return this.cs.deleteJson(url);
    }
}
