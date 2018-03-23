import { Component, OnInit } from '@angular/core';
import { AuthorizeApiService } from '../api.service';
import { CommonMessage } from '@core/services/common-message.service';

@Component({
    selector: 'app-authorize-search',
    templateUrl: './authorize-search.component.html',
    styles: []
})
export class AuthorizeSearchComponent implements OnInit {
    userAuthData: any = [];
    searchParams: any = {
        uid: "",
        app: null,
        path: ""
    }
    loading = false;
    selectOption: any = [];
    selectedRows: any[] = [];
    _allChecked = false;
    _displayData: Array<any> = [];
    _indeterminate = false;
    checkData: any = {};
    checkResult = null;
    opSelectOptions: any = [];

    _displayDataChange($event) {
        this._displayData = $event;
    }

    _refreshStatus() {
        const allChecked = this._displayData.every(value => value.checked === true);
        const allUnChecked = this._displayData.every(value => !value.checked);
        this._allChecked = allChecked;
        this._indeterminate = (!allChecked) && (!allUnChecked);
        this.selectedRows = this.userAuthData.filter(value => value.checked);
    }

    _checkAll(value) {
        if (value) {
            this._displayData.forEach(data => data.checked = true);
        } else {
            this._displayData.forEach(data => data.checked = false);
        }
        this._refreshStatus();
    }

    constructor(private api: AuthorizeApiService, private cm: CommonMessage) {
    }

    ngOnInit() {
        this.api.getAppSelect().then(data => {
            if (data.code === 0) {
                this.selectOption = data.data;
            }
        });
        this.api.getOperations().then(data => {
            if (data.code === 0) {
                this.opSelectOptions = data.data;
            }
        });
    }

    getData() {
        this.api.getUserAuth(this.searchParams).then(data => {
            if (data.code === 0) {
                this.userAuthData = data.data;
            }
        });
    }

    delAuth(id) {
        this.api.deleteUserAuth(id).then(data => {
            if (data.code === 0) {
                this.getData();
                this.cm.createMessage('success', "删除成功！");
            }
        });
    }

    deleteRows() {
        const ids = this.selectedRows.map(item => item.id);
        this.api.deleteUserAuths(ids).then(data => {
            if (data.code === 0) {
                this.getData();
                this.cm.createMessage('success', "删除成功！");
            }
        });
    }

    checkAuth() {
        this.api.checkAuth(this.checkData).then(data => {
            if (data.code === 0) {
                this.checkResult = data.data;
            }
        });
    }
}
