import {Injectable} from "@angular/core";
import {CommonService} from "app/core/services/common.service";

@Injectable()

export class PrivilegeListService {

    mddUrl = '/mobile/mdd/index';

    constructor(private cs: CommonService) {
    }

    getRuleList(json) {
        const url = CommonService.appendParams(`${this.mddUrl}/rules`, json);
        return this.cs.getJson(url);
    }

    toggle(json) {
        return this.cs.postForm(`${this.mddUrl}/toggle`, json);
    }

    delRule(json) {
        return this.cs.postForm(`${this.mddUrl}/delrule`, json);
    }
}
