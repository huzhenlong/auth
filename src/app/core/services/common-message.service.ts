import {NzMessageService} from "ng-zorro-antd";
import {Injectable} from "@angular/core";

@Injectable()
export class CommonMessage {

    constructor(private _message: NzMessageService) {
    }

    checkSuccess(msg): boolean {
        const error = msg.error;
        if (error && error != 0) {
            this.createMessage('error', msg.message);
            return false;
        }
        return true;
    }

    checkCode(msg): boolean {
        const code = msg.code;
        if (code && code !== 0) {
            this.createMessage('error', msg.message);
            return false;
        }
        return true;
    }

    serverError() {
        this._message.create('error', '服务端异常！请稍后重试！');
    }

    createMessage = (type, text) => {
        this._message.create(type, `${text}`);
    }
}
